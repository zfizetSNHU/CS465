const tripsEndpoint = "http://localhost:3000/api/trips";
const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

/* GET travel list view */
const travel = async function (req, res, next) {
  try {
    const response = await fetch(tripsEndpoint, options);
    const json = await response.json();

    let message = null;
    let trips = [];

    if (!(json instanceof Array)) {
      message = "API lookup error";
    } else if (!json.length) {
      message = "No trips exist in our database!";
    } else {
      trips = json;
    }

    res.render("travel", {
      title: "Travlr Getaways",
      trips,
      message,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

/* GET travel details view (single trip) */
const travelDetails = async function (req, res, next) {
  try {
    const tripCode = req.params.tripCode;
    const response = await fetch(`${tripsEndpoint}/${tripCode}`, options);
    const trip = await response.json();

    if (!trip || trip.error) {
      return res.status(404).render("error", {
        title: "Trip Not Found",
        message: "The requested trip could not be found.",
      });
    }

    res.render("travelDetails", {
      title: `Trip Details: ${trip.name}`,
      trip,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

module.exports = {
  travel,
  travelDetails,
};
