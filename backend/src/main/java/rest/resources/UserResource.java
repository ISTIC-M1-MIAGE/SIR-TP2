package rest.resources;

import dao.UserDAO;
import entities.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("user")
@Produces({"application/json"})
public class UserResource {

    private UserDAO userDAO = new UserDAO();

    @GET
    @Path("/{userId}")
    @Operation(summary = "Get user by ID", description = "Returns a single user based on the provided ID")
    @Parameter(description = "ID of the user to retrieve", required = true)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserById(@PathParam("userId") Long userId) {
        User user = userDAO.findOne(userId);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
        }
        return Response.ok().entity(user).build();
    }


    @POST
    @Consumes("application/json")
    @Operation(summary = "Create a new user", description = "Adds a new user to the store")
    @Parameter(description = "User object that needs to be added to the store", required = true)
    public Response addUser(
            @Parameter(description = "User object that needs to be added to the store", required = true) User user) {
        // add user
        userDAO.save(user);
        return Response.status(Response.Status.CREATED).entity("User created").build();
    }
}

