package rest.resources;


import dao.UserDAO;
import entities.User;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Response;
import rest.auth.JwtUtil;
import rest.auth.PasswordUtil;

@Path("auth")
@Produces({"application/json"})
public class AuthResource {

    private UserDAO userDAO = new UserDAO();

    @Path("login")
    @POST
    @Consumes("application/json")
    public Response login(String email, String password) {
        User user = userDAO.findByEmail(email);
        if (user == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User not found").build();
        }
        // Check if the password is correct
        if (!PasswordUtil.verifyPassword(password, user.getPassword())) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid password").build();
        }
        // Here you would typically generate a JWT token and return it
        String token = JwtUtil.generateToken(user.getEmail());
        return Response.ok()
                .header("Authorization", "Bearer " + token)
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
        catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("User registration failed").build();
        }
        // For this example, we'll just return a success message
        return Response.status(Response.Status.CREATED).entity("User registered successfully").build();
    }
}
