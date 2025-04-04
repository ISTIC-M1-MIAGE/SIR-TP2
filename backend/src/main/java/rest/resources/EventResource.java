package rest.resources;

import dao.EventDAO;
import dto.EventDTOout;
import entities.Event;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("event")
@Produces({"application/json"})
public class EventResource {
    private EventDAO eventDAO = new EventDAO();

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEvents() {
        List<Event> events = eventDAO.findAll();
        return Response.ok().entity(EventDTOout.convertEventsToDTOout(events)).build();
    }

    @POST
    @Consumes("application/json")
    public Response addEvent(
            @Parameter(description = "Event object that needs to be added to the store", required = true) Event event) {
        // add user
        eventDAO.save(event);
        return Response.status(Response.Status.CREATED).entity("User created").build();
    }
}
