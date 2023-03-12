export const generateTextForTechnologies = (currentId: number): ITerminalRow[] => {
  return [
    {
      id: currentId + 1,
      active: false,
      type: 'CUSTOM_TEXT',
      listItem: true,
      value: 'Programming Languages - Javascript/Typescript, Java, SQL, HTML, CSS',
    },
    {
      id: currentId + 2,
      active: false,
      type: 'CUSTOM_TEXT',
      listItem: true,
      value:
        'Technologies & Frameworks - Node.js, React.js, Next.js, Angular, Spring, git, Docker, K8s, GraphQL, RabbitMQ, Postman, Gitlab/Github',
    },
  ];
};
