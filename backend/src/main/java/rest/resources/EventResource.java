package rest.resources;

import dao.CityDAO;
import dao.EventDAO;
import dao.UserDAO;
import dto.EventDTOin;
import dto.EventDTOout;
import entities.City;
import entities.Event;
import entities.User;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("event")
@Produces({"application/json"})
public class EventResource {
    private EventDAO eventDAO = new EventDAO();
    private CityDAO cityDAO = new CityDAO();
    private UserDAO userDAO = new UserDAO();

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEvents() {
        List<Event> events = eventDAO.findAll();
        return Response.ok().entity(EventDTOout.convertEntitiesToDTOout(events)).build();
    }

    @GET
    @Path("/{eventId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEventById(@PathParam("eventId") Long eventId) {
        Event event = eventDAO.findOne(eventId);
        if (event == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
        return Response.ok().entity(new EventDTOout(event)).build();
    }



    @POST
    @Consumes("application/json")
    public Response addEvent(
            @Parameter(description = "Event object that needs to be added to the store", required = true) EventDTOin event) {
        // find city and user
        City city = cityDAO.findOne(event.getCityId());
        User organizer = userDAO.findOne(event.getOrganizerId());
        eventDAO.save(new Event(event, city, organizer));
        return Response.status(Response.Status.CREATED).entity("Event created").build();
    }
}
