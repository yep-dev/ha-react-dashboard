# Home Assistant React Dashboard

Built with awesome HA-react utilities from [@hakit/core](https://github.com/shannonhochkins/ha-component-kit)

Familiarity with React and HA is required to use it effectively

![pic](https://raw.githubusercontent.com/yep-dev/ha-react-dashboard/master/docs/pic.png)
![screenshot](https://raw.githubusercontent.com/yep-dev/ha-react-dashboard/master/docs/ss.png)

Designed to fulfil the following requirements:
- mobile-first dashboard part, meant for xperia phone attached to the arm
- dark, flat, and minimalist UI, with prominent colors for marking different states
- relying on text, icons, and layout for dense yet readable contents
- standardized sizes, spacing, and behavior
- grouping by rounding corners in even rows instead of adding spacing
- additional pages like "stats" for permanent display on its own screen
- additional, 4th row in for 2x2 layout for use on tablet

Includes:
- base components I used as a building blocks for the UI, that you can reuse as well:
  - Card
  - Icon
  - IconLabel
  - IncrementSelect
  - index
  - InfoCard
  - Modal
  - Stack
  - Txt
- cards – sections of the screen with components connected to the entities, so also serving as the example of components usage
  - AirConditioner
  - Boiler
  - DateTime
  - Light
  - Sensors
  - TimeBlock
  - Notifications
  - Player
  - Portainer
  - Sequences
  - CurrentProject
  - CurrentProjectTimer
  - DmnPicker
  - Resources
  - SleepTimer
- screens – some my dashboard's screens that serve as the main entrypoint and layout for cards 
- modals system for fast details display and nested pickers 
- all in the setup ready clone, develop and deploy your own dashboard

The icons are from the paid set from [streamline](https://www.streamlinehq.com/) You need to subscribe to them to get additional icons, but you're free to keep using the ones I already included. You can easily replace them with your own or with `@iconify/react` ones used by `@hakit` – it includes the HA default material icons too.