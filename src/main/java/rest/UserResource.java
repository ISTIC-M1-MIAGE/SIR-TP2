package rest;

import entities.User;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

@Path("user")
@Produces({"application/json", "application/xml"})
public class UserResource {

    @GET
    @Path("/{userId}")
    public User getUserById(@PathParam("userId") Long userId) {
        // return pet
        return new User();
    }

    @GET
    @Path("/")
    public User getPet(Long userId) {
        return new User();
    }


    @POST
    @Consumes("application/json")
    public Response addPet(
            @Parameter(description = "Pet object that needs to be added to the store", required = true) User user) {
        // add pet
        return Response.ok().entity("SUCCESS").build();
    }
}
