# Build a page for a list of conversations.

## Definitions

**A conversation** is an exchange between a user and a system that collects customer information. A session is created as soon as a customer sends any message and is completed when the system has collected enough customer information.

**Conversation content** is secure. Only information about the user and the conversation state can be queried.

**The Customer Information Collection System** is an auxiliary application that creates conversations and collects information via WhatsApp.

## Description

* The **left sidebar** contains a list of `conversations` displayed as a preview.
  - `Application Readiness`: Readiness status showing collected information ("EMPTY"/ "MISSING"/ "READY")
  - `WAMID`: WhatsApp user ID, from WhatsApp chat.
  - `Phone Number`: user's phone number, from WhatsApp chat
  - `WhatsApp Full Name`: user's display name, from WhatsApp chat
  - `Time`: last time information was collected.

* Search bar to search for sessions by `WAMID`, `Phone Number`, or `WhatsApp Full Name`.

* Clicking on a specific `conversation` on sidebar will display details of the collected information.

* The details panel may display aggregated information at the top and collected information below.
  - Overview Header
    - `Application Readiness`: Readiness status.
    - `Is Ready For Handoff`: Ready for the next processing step (When Application Readiness is ready)
  - Overview
    - `Phone Number`: user's phone number (similar to the preview item value).
    - `WhatsApp Full Name`: user's display name (similar to the preview item value).
    - `Time`: last time information was collected (similar to the preview item value).
  - Collected information
    - `Customer Name`: Customer name (different from WhatsApp Full Name), collected from WhatsApp chat.
    - `RFC`: *RFC (Registro Federal de Contribuyentes)* 
    - `CURP`: *CURP (Clave Única de Registro de Población)*
    - `Residential Address`: Current residential address (Including street, house number, ward/commune, district, state, and postal code)
    - `Monthly Income`: Monthly income (MNX/month)
    - `Loan Amount Requested`: Requested loan amount (MNX)
    - `Estimated Interest Rate`: Estimated interest rate calculated on loan package / amount / actual timing.
    - `Credit Bureau Authorization`: Authorization to check credit history (Yes / No)
    - `Documents Received`: List of collected documents (display a *thumbnail* if a URL is included in the content, otherwise display "black panel" with "No document received" text)

**Note**:

  - *In non-focus mode*, the details panel will remain displayed as a blank panel.
  - *Highlights* uncollected (empty) information
  - *Highlights* Credit Bureau Authorization if value is False/No