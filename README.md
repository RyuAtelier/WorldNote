# WorldNote
[![Crowdin](https://badges.crowdin.net/worldnote/localized.svg)](https://crowdin.com/project/worldnote)

![WorldNote banner](https://noteonthe.world/assets/meta_banner.jpg)

Welcome to WorldNote! Share your memories and experiences with strangers around the world.

WorldNote is an innovative platform that allows users to leave notes on a global map, sharing their memories, experiences, and more with people everywhere.

## Contribution

WorldNote is currently in beta and constantly evolving. We appreciate and welcome contributions from the community to help improve the platform. You can contribute by submitting pull requests. 

### How to Contribute

1. **Fork the Repository**: Create your own copy of the repository by forking it.
2. **Clone the Repository**: Clone the forked repository to your local machine.
3. **Create a Branch**: Create a new branch for your feature or bug fix.
4. **Make Changes**: Implement your changes in the new branch.
5. **Test Your Changes**: Ensure your changes work as intended.
6. **Submit a Pull Request**: Push your changes to your forked repository and submit a pull request to the `dev` repository.

### Contribution Guidelines

- Please read the [LICENSE](https://github.com/RyuAtelier/WorldNote/blob/main/LICENSE) file in the repository to understand the contribution guidelines and self-deployment restrictions.
- Ensure your code adheres to the existing coding standards and conventions. Make sure you document everything.
- Provide clear and concise commit messages.
- Include detailed descriptions in your pull requests.

## How to deploy?

To deploy WorldNote, follow these steps:

1. **Clone the Repository**: First, clone the WorldNote repository to your local machine:
   ```sh
   git clone https://github.com/RyuAtelier/WorldNote.git
   cd WorldNote
   ```

2. **Install Dependencies**: Install all required dependencies using npm:
   ```sh
   npm install
   npm install --only=dev
   ```

3. **Development Mode**: If you want to work on the project and need automatic re-deployment on file changes, use:
   ```sh
   npm run dev
   ```
   This command sets up a development environment and watches for changes in the directory.

4. **Production Deployment**: For a production deployment, use your deployment script (`deploy.sh`). Ensure the script is correctly configured for your production environment.

By following these steps, you can effectively set up and deploy WorldNote in both development and production environments.

## License

WorldNote is released under a custom license that encourages contributions while restricting standalone deployment. For detailed information, please refer to the [LICENSE](https://github.com/RyuAtelier/WorldNote/blob/main/LICENSE) file in the repository.

## Contact

If you have any questions, suggestions, or feedback, feel free to reach out to us through the repository's issue tracker or via [hello@noteonthe.world](mailto:hello@noteonthe.world).