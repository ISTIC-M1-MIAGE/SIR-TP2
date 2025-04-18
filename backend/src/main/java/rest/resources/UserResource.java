package rest.resources;

import dao.UserDAO;
import entities.User;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    private final UserDAO userDAO = new UserDAO();

    @GET
    @Path("/{userId}")
    public Response getUserById(@PathParam("userId") Long userId) {
        User user = userDAO.findOne(userId);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
        }
        return Response.ok().entity(user).build();
    }


    @POST
    public Response addUser(
            @Parameter(description = "User object that needs to be added to the store", required = true) User user) {
        // add user
        userDAO.save(user);
        return Response.status(Response.Status.CREATED).entity("User created").build();
    }
}

