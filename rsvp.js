// 1. Get guest ID from URL
const urlParams = new URLSearchParams(window.location.search);
const guestID = urlParams.get("guest");

// 2. Load guest data JSON
fetch("./data/guest.json")
  .then(response => response.json())
  .then(data => {

    // If guest not found → stop
    if (!data[guestID]) {
      console.log("Guest ID not found:", guestID);
      return;
    }

    const guestName = data[guestID].guest_name;
    const maxPax = data[guestID].num_pax;

    // 3. Build pre-filled Google Form URL
    const baseURL =
      "https://docs.google.com/forms/d/e/1FAIpQLSep1JapQHXxlWNMsbXPKaYEXhfxHLRcCqj4KCLoQ0wmtaKdGA/viewform?embedded=true&usp=pp_url";

    const filledURL =
      baseURL +
      "&entry.423809106=" + encodeURIComponent(guestName) +
      "&entry.135572410=" + encodeURIComponent("Max: " + maxPax) +
      "&entry.709161808=Can+Attend";

    // 4. Replace iframe src
    document.getElementById("rsvp-iframe").src = filledURL;
  })
  .catch(err => console.error("Failed to load guest.json", err));
