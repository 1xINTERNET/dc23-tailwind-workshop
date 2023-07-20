# Setup
1. To start the project run `ddev start && ddev composer install`
2. To import the demo database run `ddev import-db --src=./resources/demo-database.sql.gz && ddev drush cr`
3. To launch the project run `ddev launch`
4. To login into the site run `ddev drush uli`

# Install
1. In ../web/themes/custom/DemoDesign/design-system `nvm use`
2. In ../web/themes/custom/DemoDesign/design-system `npm install`
3. In ../web/themes/custom/DemoDesign/ `npm install`

# Storybook
1. In ../web/themes/custom/DemoDesign/design-system `npm start`

# Compile the changes
1. In ../web/themes/custom/DemoDesign/design-system `npm run build`
2. In ../web/themes/custom/DemoDesign/ `npm run build`
