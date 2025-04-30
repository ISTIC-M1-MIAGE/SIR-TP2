package rest.resources;

import dao.EventDAO;
import dao.PassDAO;
import dto.PassDTO;
import entities.Event;
import entities.Pass;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

@Path("pass")
@Produces({"application/json"})
public class PassResource {

    private PassDAO passDAO = new PassDAO();
    private EventDAO eventDAO = new EventDAO();

    @GET
    @Path("/")
    @Produces({"application/json"})
    @Operation(summary = "Get all passes")
    public Response getPass() {
        try {
            // Assuming you want to retrieve all passes
            var passes = passDAO.findAll();
            return Response.ok().entity(passes).build();
        } catch (Exception e) {
            System.out.println("Error retrieving passes: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("Error retrieving passes").build();
        }
    }

    @POST
    @Consumes({"application/json"})
    @Operation(summary = "Create a new pass", description = "Adds a new pass to the store")
    public Response createPass(@Parameter(description = "Pass object that needs to be added to the store", required = true)PassDTO pass) {
        System.out.println("Creating pass: " + pass);
        try {
            Event event = eventDAO.findOne(pass.getEventId());
            if (event == null) {
                return Response.status(Response.Status.NOT_FOUND)
                               .entity("Event not found").build();
            }

            // Assuming you want to save a new pass
            passDAO.save(new Pass(pass.getName(), pass.getPrice(), pass.getAdvantages(), event));
            return Response.status(Response.Status.CREATED).entity("Pass created")
                    .build();
        } catch (Exception e) {
            System.out.println("Error creating pass: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("Error creating pass").build();
        }
    }

}
