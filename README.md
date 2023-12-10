# University Reunion Event Web App

## Overview

The University Reunion Event Web App is a demo application showcasing a web-based solution for managing and displaying events related to university reunions. The application utilizes React.js for the frontend and integrates with a backend API to fetch and display event data.

## Features

1. **Event Display:** View a list of university reunion events, categorized by date.
2. **Typeahead Search:** Easily search and filter events using a typeahead search feature.
3. **Pagination:** Navigate through event pages with a customizable pagination component.
4. **Event Selection:** Select and manage your attendance by choosing specific events.
5. **Responsive Design:** Ensure a seamless experience across various devices.

## Technologies Used

- **React.js:** A JavaScript library for building user interfaces.
- **React Bootstrap:** A front-end framework that simplifies the development of responsive UI components.
- **Bootstrap Typeahead:** An extension of Bootstrap's Typeahead plugin for efficient event searching.
- **Fetch API:** Used to interact with the backend API for fetching event data.

## Getting Started

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Run the application: `npm start`

## Project Structure

- **src/components:** Contains React components for different parts of the application.
- **src/style:** Includes CSS files for styling the application components.

## Improvements I can make into this solution
a. To optimize the dynamic search, I'd start by adding a debounce mechanism to the Typeahead search for fewer API calls and better responsiveness. I'd also implement lazy loading and pagination to fetch only necessary data, improving initial load times. Server-side filtering would reduce data transfer, especially for larger datasets. Virtualization with react-window would enhance performance for extensive lists.

b. I would focus on enhancing button accessibility by providing clear labels and visible focus styles, ensuring that users utilizing screen readers or keyboards can easily navigate and interact with the attending and removing buttons. Additionally, I would implement dynamic screen reader announcements for real-time updates when events are added or removed. Utilizing ARIA roles and attributes would help convey the semantic meaning of UI elements. Responsive design considerations would be maintained to ensure a consistent and user-friendly experience across various devices. Conducting usability testing with individuals of diverse abilities and providing comprehensive user documentation on using pick-and-choose features with assistive technologies would further contribute to the overall accessibility of the application.

c. To ensure accessibility in the React application, I would meticulously address each component by using semantic HTML elements, providing meaningful alt text for images, enabling keyboard navigation, implementing clear focus styles, maintaining sufficient color contrast ratios, creating accessible forms with proper labels, utilizing ARIA roles and attributes as needed, and regularly testing with accessibility tools. For the overall application, I would prioritize a responsive design, follow the principles of progressive enhancement, conduct user testing with individuals possessing diverse abilities, and provide comprehensive documentation on using the application with assistive technologies.

d. In designing and developing this application, I would prioritize a user-centric approach by considering accessibility from the outset, ensuring that all components adhere to best practices for inclusive design. I'd focus on creating a responsive and intuitive user interface with clear navigation and meaningful feedback. Additionally, I would be conscious of performance optimization, minimizing unnecessary rendering and optimizing data fetching for improved user experience. Thorough testing, including cross-browser and cross-device compatibility checks, would be essential, and I would conduct usability testing with a diverse group of users to identify and address potential pain points. Documentation for developers and end-users would also be a key aspect to facilitate seamless use and maintenance of the application over time.

![Searching Muliple Events](/Event.png)
![Initial Page](/Index.png)



