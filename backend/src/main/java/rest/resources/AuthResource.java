package rest.resources;


import dao.UserDAO;
import dto.UserDTOout;
import entities.User;
import io.jsonwebtoken.JwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import rest.auth.AuthRequest;
import rest.auth.JwtUtil;
import rest.auth.PasswordUtil;
import rest.auth.Secured;

import java.security.Principal;
import java.util.Collections;


@Path("auth")
@Produces({"application/json"})
public class AuthResource {

    private UserDAO userDAO = new UserDAO();

    @Path("login")
    @POST
    @Operation(summary = "Login user", description = "Login user and return JWT token")
    @Consumes("application/json")
    public Response login(@Parameter AuthRequest authRequest) {
        User user = null;
        try {
            user = userDAO.findByEmail(authRequest.getEmail());
        } catch (Exception e) {
            System.out.println("User not found: " + e.getMessage());
            return Response.status(Response.Status.UNAUTHORIZED).entity("User Email not Existing").build();
        }
        // Check if the password is correct
        if (!PasswordUtil.verifyPassword(authRequest.getPassword(), user.getPassword())) {
            System.out.println("Invalid password");
            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid password").build();
        }
        // Here you would typically generate a JWT token and return it
        String token = JwtUtil.generateToken(user.getEmail());

        return Response.ok()
                .entity(Collections.singletonMap("token", token))
                .build();
    }

    @Path("register")
    @POST
    @Operation(summary = "Register user", description = "Register a new user")
    @Consumes("application/json")
    public Response register(@Parameter User user) {
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
    @Secured
    @Path("/me")
    @Operation(summary = "Get current user", description = "Get the current authenticated user")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCurrentUser(@Context SecurityContext securityContext) {
        // print all the request details
        Principal principal = securityContext.getUserPrincipal();
        // Get the JWT token from the request header
        if ( principal == null) {
            System.out.println("Cannot retrieve user principal, not authenticated");
            return Response
                    .status(Response.Status.UNAUTHORIZED)
                    .entity("Not authenticated")
                    .build();
        }
        String email = principal.getName();
        try {
            System.out.println("Retrieving user with email: " + email);
            User user = userDAO.findByEmail(email);
            return Response.ok(new UserDTOout(user)).build();
        }
        catch (JwtException e) {
            System.out.println("Invalid or expired token: " + e.getMessage());
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(Collections.singletonMap("error", "Invalid or expired token "+e.getMessage()))
                    .build();
        }
    }
}

