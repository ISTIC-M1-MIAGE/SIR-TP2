package rest.resources;

import dao.CityDAO;
import dao.EventDAO;
import dao.UserDAO;
import dto.EventDTOin;
import dto.EventDTOout;
import dto.PassDTO;
import entities.City;
import entities.Event;
import entities.Pass;
import entities.User;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "Get all events")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEvents() {
        List<Event> events = eventDAO.findAll();
        return Response.ok().entity(EventDTOout.convertEntitiesToDTOout(events)).build();
    }

    @GET
    @Path("/{eventId}")
    @Operation(summary = "Get event by ID", description = "Returns a single event based on the provided ID")
    @Parameter(description = "ID of the event to retrieve", required = true)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEventById(@PathParam("eventId") Long eventId) {
        Event event = eventDAO.findOne(eventId);
        if (event == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
        return Response.ok().entity(new EventDTOout(event)).build();
    }

    @GET
    @Path("/{eventId}/passes")
    @Operation(summary = "Get passes for an event", description = "Returns a list of passes associated with the specified event")
    @Parameter(description = "ID of the event to retrieve passes for", required = true)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEventPasses(@PathParam("eventId") Long eventId) {
        Event event = eventDAO.findOne(eventId);
        if (event == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Event not found").build();
        }
        // Assuming you have a method in EventDAO to get passes for an event
        List<Pass> passes = event.getPasses(); // Adjust this line based on your actual implementation

        List<PassDTO> dtos = PassDTO.convertEntitiesToDTOout(passes);
        System.out.println("Retrieved passes: " + dtos.toString());
        return Response.ok().entity(dtos)
                .build();
    }



    @POST
    @Path("/")
    @Operation(summary = "Create a new event", description = "Adds a new event to the system")
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
