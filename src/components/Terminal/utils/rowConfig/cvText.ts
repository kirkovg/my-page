export const generateTextForCv = (currentId: number): ITerminalRow[] => {
  return [
    {
      id: currentId + 1,
      active: false,
      type: 'CUSTOM_TEXT',
      value: 'Experience',
      bold: true,
      header: true,
    },
    {
      id: currentId + 2,
      active: false,
      type: 'CUSTOM_TEXT',
      value: 'Bright Marbles | Senior Software Engineer in Skopje, North Macedonia (January 2022 - present)',
      bold: true,
    },
    {
      id: currentId + 3,
      active: false,
      type: 'CUSTOM_TEXT',
      listItem: true,
      value:
        'Working on the development of a platform for buying & registration of domain names, email, web hosting & web shop products serving 1M+ of domains',
    },
    {
      id: currentId + 4,
      active: false,
      type: 'CUSTOM_TEXT',
      listItem: true,
      value:
        'Led the web frontend development of an MVP of a web 3.0, fan-first, e-commerce platform revolutionizing the live event experience',
    },
    {
      id: currentId + 5,
      active: false,
      type: 'CUSTOM_TEXT',
      value: 'Netcetera | Senior Software Engineer in Skopje, North Macedonia (November 2017 - January 2022)',
      bold: true,
    },
    {
      id: currentId + 6,
      active: false,
      type: 'CUSTOM_TEXT',
      listItem: true,
      value:
        'Co-led the frontend development of a real estate evaluation platform for the DACH region, reducing the evaluation process in just a few clicks',
    },
    {
      id: currentId + 7,
      active: false,
      type: 'CUSTOM_TEXT',
      listItem: true,
      value:
        'Provided technical expertise & reviews for the web frontend tech stack on a Swiss-based financial planning platform',
    },
    {
      id: currentId + 8,
      active: false,
      type: 'CUSTOM_TEXT',
      value: 'Netcetera | Software Engineering Intern in Ohrid, North Macedonia (July 2017 - September 2017)',
      bold: true,
    },
    {
      id: currentId + 9,
      active: false,
      type: 'CUSTOM_TEXT',
      listItem: true,
      value:
        'Worked on the development and extensions of the Web Service API of a real estate valuation platform for the DACH region',
    },
    {
      id: currentId + 10,
      active: false,
      type: 'CUSTOM_TEXT',
      header: true,
      value: 'Education',
      spacingTop: true,
      bold: true,
    },
    {
      id: currentId + 11,
      active: false,
      type: 'CUSTOM_TEXT',
      value: 'University of St. Cyril and Methodius in Skopje, North Macedonia (September 2014 - October 2018)',
      bold: true,
    },
    {
      id: currentId + 12,
      active: false,
      type: 'CUSTOM_TEXT',
      listItem: true,
      value: 'BSc. in Computer Science and Engineering; Special focus on scalable web application development',
    },
  ];
};
