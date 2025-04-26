package rest.resources;


import dao.UserDAO;
import dto.UserDTOout;
import entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.NewCookie;
import jakarta.ws.rs.core.Response;
import rest.auth.AuthRequest;
import rest.auth.JwtUtil;
import rest.auth.PasswordUtil;

import java.util.Collections;

@Path("auth")
@Produces({"application/json"})
public class AuthResource {

    private UserDAO userDAO = new UserDAO();

    @OPTIONS
    public Response preflight() {
        return Response.ok()
                .header("Access-Control-Allow-Origin", "http://localhost:3000")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Headers", "Content-Type")
                .header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
                .build();
    }

    @Path("login")
    @POST
    @Consumes("application/json")
    public Response login(AuthRequest authRequest) {
        User user = null;
        try {
            user = userDAO.findByEmail(authRequest.getEmail());
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("User not found").build();
        }
        // Check if the password is correct
        if (!PasswordUtil.verifyPassword(authRequest.getPassword(), user.getPassword())) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid password").build();
        }
        // Here you would typically generate a JWT token and return it
        String token = JwtUtil.generateToken(user.getEmail());
        NewCookie cookie = new NewCookie(
                "XSRF-TOKEN",        // name
                token,               // value
                "/",                 // path
                "localhost",         // domain
                "XSRF Token",        // comment
                3600,                // max-age (seconds)
                false,               // secure?
                true                 // httpOnly?
        );


        return Response.ok()
                .cookie(cookie)
                //.header("Set-Cookie", "XSRF-TOKEN=" + token + "; Path=/; HttpOnly; SameSite=None; Max-Age=3600; Domain=localhost")
                .entity("Login successful")
                .build();
    }



    @Path("register")
    @POST
    @Consumes("application/json")
    public Response register(User user) {
        // Here you would typically save the user to the database
        String encryptedPassword = PasswordUtil.hashPassword(user.getPassword()); // Encrypt the password before saving
        user.setPassword(encryptedPassword);
        try{
            userDAO.save(user);
        }
        // catch user existing in the database exception
        catch (IllegalArgumentException e){
            return Response.status(Response.Status.BAD_REQUEST).entity("User already exists").build();
        }
        catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("User registration failed").build();
        }
        // For this example, we'll just return a success message
        return Response.status(Response.Status.CREATED).entity("User registered successfully").build();
    }

    @GET
    @Path("/me")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCurrentUser(@CookieParam("XSRF-TOKEN") String token) {
        // print all the request details
        System.out.println("Request Headers: " + token);

        if (token == null || token.isEmpty()) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        try {
            Claims claims = JwtUtil.validateToken(token).getBody();
            String email = claims.getSubject();
            User user = userDAO.findByEmail(email);

            return Response.ok(new UserDTOout(user)).build();
        }
        catch (JwtException e) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(Collections.singletonMap("error", "Invalid or expired token "+e.getMessage()))
                    .build();
        }
    }
}

