![img.png](img.png)
# Invoice App
The Invoice App (named as **starter**, when you install it) is a small mobile application that allows users to issue invoices on their phones. The app provides a user-friendly interface for creating, editing, and managing invoices. It is built using React Native and TypeScript, ensuring a robust and type-safe development process.

## Purpose

The purpose of this project is to demonstrate the ability to develop a mobile application for invoice management. It serves as a skill assessment task for Kiosk Buddy, a company focused on providing innovative solutions for businesses.

## Features

- Create and edit invoices with detailed information such as client details, items, and payment terms.
- Automatic calculation of payment due date based on the invoice's creation date and payment terms.
- Efficient handling of invoice items, including quantity, price, and total calculations.
- Support for adding and deleting items from the invoice.
- Real-time validation of input fields to ensure accurate and error-free invoice data.
- Intuitive user interface, following design guidelines for a seamless user experience.

## Project Structure

The project follows a well-organized structure to maintain code readability and scalability. Key directories include:

- `src`: Contains the source code of the application, including components, hooks, types, utils, and configs.
- `__tests__`: Holds test cases for the project.

## How to Run

To run the Invoice App on your local machine, follow these steps:

1. Clone the repository to your local machine:
2. Navigate to the project directory:

```
cd [project]/starter-code

```

1. Install the dependencies using Yarn or npm:

```

npm install
```

1. Install Pods:

```
npx pod-install
```

1. Run the project

```
npm run android
npm run ios
```

Alternatively, you can run the app on an iOS or Android simulator by using the attached bundle files

- assignment.apk - Android debug bundle
- assignment-release.apk Android release bundle
- assignment.zip - iOS debug bundle
- assignment-release.zip - iOS debug bundle

## Testing

The Invoice App includes test cases to ensure code quality and functionality. The tests are written using Jest and `react-native-testing-library`. To run the tests, use the following command:

```
npm run test
```

## Technologies Used

- React Native: For building the cross-platform mobile application.
- TypeScript: For type-safe development and enhanced code quality.
- ESLint: For code linting and enforcing coding standards.
- Prettier: For code formatting to maintain consistent code style.
- Jest: For writing and executing test cases.
- `react-native-testing-library`: For testing React Native components.
- Redux as the State Management
- Redux Persist, to persis the data stored in redux

## Note

This project has been tested on various devices, including iPhone 12 Pro Max, iPhone XS Max, iPhone X, Samsung Galaxy S7, Samsung Galaxy S8, and iOS simulator iPhone SE 16.2 and Android emulator Pixel_3_XL_API_29.

For any issues, feedback, or inquiries, please contact alireza@goudarzi.ws.

---

Thank you for considering this project! If you have any questions or need further assistance, feel free to reach out. Happy coding!
