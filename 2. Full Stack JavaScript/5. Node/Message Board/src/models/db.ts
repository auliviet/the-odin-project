export class DB {
  static messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date(),
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date(),
    },
    {
      text: "How are you?",
      user: "Amando",
      added: new Date(),
    },
    {
      text: "Good thanks!",
      user: "Charles",
      added: new Date(),
    },
    {
      text: "And you?",
      user: "Charles",
      added: new Date(),
    },
    {
      text: "Not too bad",
      user: "Amando",
      added: new Date(),
    },
    {
      text: "Great!",
      user: "Charles",
      added: new Date(),
    },
  ];

  static async getAllMessages() {
    return this.messages;
  }

  static async getAllUsers() {
    const users: Record<string, number> = {};

    this.messages.forEach((message) => {
      users[message.user] = (users[message.user] ?? 0) + 1;
    });

    return users;
  }

  static async getUser(user: string) {
    return this.messages.filter((message) => message.user === user);
  }

  static async postMessage(text: string, user: string) {
    this.messages.push({ text, user, added: new Date() });
  }
}
