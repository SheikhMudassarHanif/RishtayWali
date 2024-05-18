# RishtayWali

RishtayWali is a web-based application designed to help singles find their life partners. This project is built using Node.js, Express, MongoDB, EJS, and CSS.


## Features

- User registration and login
- Profile creation and editing
- Browsing and searching profiles
- Sending and receiving connection requests
- Messaging between users
- Admin panel for managing users and site content

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/rishtaywali.git
   ```

2. Navigate to the project directory:
   ```sh
   cd rishtaywali
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

4. Set up your MongoDB database and add your MongoDB URI to a `.env` file in the root of the project:
   ```env
   MONGODB_URI=your_mongodb_uri
   ```

5. Start the application:
   ```sh
   node app.js
   ```

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Register a new account or log in with an existing account.
3. Create and customize your profile.
4. Browse and search for potential matches.
5. Send connection requests and start messaging with other users.

## Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data and profiles.
- **EJS**: Embedded JavaScript templates for rendering HTML.
- **CSS**: Styling the user interface.

## File Structure

```
rishtaywali/
├── public/
│   ├── css/
│   │   └── styles.css
├── routes/
│   ├── index.js
│   ├── users.js
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── home.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── profile.ejs
│   ├── browse.ejs
├── app.js
├── package.json
└── .env
```

## Contributing

We welcome contributions to enhance the functionality and features of this project. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```sh
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```sh
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using RishtayWali! We hope you find your perfect match. If you have any questions or feedback, please feel free to open an issue or contact us directly.
