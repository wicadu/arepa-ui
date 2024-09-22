# 1.30.2

- Export `InputFeeback` molecule.

# 1.30.1

- Check if _OriginalImageSize_ is valid and increase quality compression for `ImageCropper`

# 1.30.0

- Update _ButtonType.white_ type for `Button`
- Add `useWindowWidth` hook
- Add `UIElementShapeEnum`
- Refactor `ImageUploader`
- Add `getCroppedImg`, `createImage` and `blobToFile` utils
- Add `react-easy-crop` dependency

# 1.29.0

- Refactor `InputFile` and `Breadcrumbs`
- Fix _styles_ for `OrderSnapshot` and `InputFeedback`
- Fix _defaultProps_ through deconstruction for `OrderItem`, `Spin` and `ImagesGallery`
- Add _time_ prop for Alert
- Force deleting _loadedFile_ first in `ImageUploaded`
- Export _useFormState_ as part of `Form`

# 1.28.2

- Small refactor for `Tabs` to get _onChangeTabs_ and _isActive_ tab

# 1.28.1

- Update `capitalize` util
- Update _useEffect_ for `OrderItemBottom`

# 1.28.0

- Refactor `OrderSnapshot`
- Add *removeToast* for `Toast`
- Add *revertQuantity* method for `OrderItem.OrderItemBottom`
- Fix *type* prop for `Alert`

# 1.27.0

- Delete `DraftBottomActions`, `DraftOrderItem` and `OrderUserCard`
- Add *styles* prop for `InputFeedback`, `RadioController`, `Alert`, `InputFile` and `OrderItem`
- Update *component* prop into `FlatList` to accept different React.ElementTypes
- Add *afterStyles* prop for `Article` and `Section`
- Update *defaultProps* and *defaultStyles* for `Column`, `Row`, `Collapsable` and `StatusChip`
- Add `OrderItemBottom` as sub component for `OrderItem`

# 1.26.0

- Refactor `Select` to use `Controller` from react-hook-form
- Add *width: 100%* as default for `Button`, `Input` and `InputFeedback`
- Refactor `OrderItem` and `OrderItem.Skeleton`
- Add `Article`
- Add extra props to custom `ImagesGallery`
- Tablet styles for `Section`

# 1.25.5

- Update `VirtualInputs` typescript props and *index* as *key*
- Change props from *prop-types* to *interface* into `Input`
- Add tablet styles support for `Section`, `Alert` and `StatusChip`

# 1.25.4

- `Section.RightChildAsButton` font size was set as 14px for tablet screens
- `Header` was added to `Section` with a margin-bottom
- `Section` was enable to accept styles from styled

# 1.25.3

- Upgrade *defaultAfterStyles* prop for `Typography`

# 1.25.2

- `.wicaduEmail(value)` custom method for yup was added

# 1.25.1

- `CheckboxController`'s virtual input was updated with `VirtualInputs`

# 1.25.0

- `VirtualInputs` component was added

# 1.24.0

- `react-hook-form` was updated to `7.52.1`

# 1.23.0

- Bug unregister virtual field of `CheckboxController` was fixed
- `InputFeedback` was added to `CheckboxGroup`

# 1.22.0

- Label was added to `CheckboxGroup`
- Font sizes for medium size `Button` were updated

# 1.21.7

- Font sizes for `Input` and `InputFeedback` were updated

# 1.21.6

- Add styles prop into `Spacer`
- Fix first-child and last-child to *of-type* warning for css into `Alert`
- Add *iconProp* into `StatusChip` and update its Enum
- Design was updated for `Toggle`

# 1.21.5

- Add `styles` prop to `Typography`, `Spacer` and `Collapsable`.
- Add *Tablet* media styles for `Alert`
- Border radius set `7px` for `Input`

# 1.21.4

- Adjust `AlertStyles` for `Alert.Small`
- Add `styles` prop to `FlatList`

# 1.21.3

- Limit `Select` default value and options to one line.
- Add options to configure params of how to display `Toast`
- Add highlight and styles props to `Button`
- Add `RefForwarding` hoc

# 1.21.2

- Add `props` to `Pricing`

# 1.21.1

- Add `props` to `Divider`

# 1.21.0

- Delete components: `UserSnippet`, `OrderSnippet`, `PreviewItemsList`, `SearchBar`, `ItemSnippetInCard`, `ItemSnippetInList`, `AddOrSubtract`, `PaymentSnippet`, `OrderItemSnippet`, `SearchBar`, `SearchBar` and `Expand`
- Add components: `Pricing` and `Toast`
- Refactor: `InputFeedback`, `formatCurrency`, `Alert`, `ImagesGallery` and `ImageUploader`
- Add interfaces: `UIElementSizesEnum` and `UIElementStatusEnum`
- Remove interfaces: `InputSizesEnum` and `IconProps`
- Synchronize versions

# 1.20.2

- Set `Catamaran` font to `Input` font

# 1.20.1

- Add `Catamaran` font

# 1.20.0

- Add `h5` and `h6` to `Typography`

# 1.19.6

- Fix build process

# 1.19.5

- Add `Urbanist` font

# 1.19.2

- Add `Collapsable`

# 1.19.1

- Refactor: `OrderSnapshot`.
- Set margin *0px* into `Button` and background color to *NEUTRAL.SIDE* into `Icon`.
- Add *flex* to `Column` and `Row`

# 1.19.0

- Refactor: `Alert`, `dateFormat`, `Icon`
- High Improvements: `Typography`, `Select`, `Button` and `OrderItem`
- Low Improvements: `Input` and `Image`
- Delete: `Notifications`
- Add:
  - Utils: `getErrorMessage`, `getBordersStyles` `getFileSize`
  - Organisms: `DraftOrderItem`, `OrderUserCard` and `Order`.
  - Molecules:`InputFile`, `StatusChip`, `UserCard`.
  - Layout: `Column`, `Row`, `Section` and `Spacer`
- Rename: `FlatList`, `OrderItem`

# 1.18.2
- `Tabs` component was updated to support custom height

# 1.18.1
- Version was added because 1.18.0 already existed

# 1.18.0

- Improvements to Button, Select and Typography.
- Small improvements to InputFeedback, Alert and capitalize util.
- Add ImageGallery organisms
- Update all dependencies and certain organize exports at index.ts
- @hookform/resolvers and yup pacakges were added

# 1.17.1

- Emotion packages were moved to dependencies section.

# 1.17.0

- Bro, I changed too many things.

# 1.16.3

- Fix `Typography` propTypes.
- Add `NavArrowUp`, `NavArrowDown`, `Store` and `MenuScale` icons.
- Improve `Select` styles and props.

# 1.16.2

- Add UsersGroup and CoffeeCup icons.

# 1.16.1

- Fix Select zIndex.
- Add TrashCan, VerticalSliders and HorizontalSliders icons.

# 1.16.0

- Select refactor.
- Add InputFeedback hoc and wrapped Select-Input.
- Add DeliveryTruck, BoxIso, Bag and Home icons.

# 1.15.2

- Add Minus, Plus and ShoppingCart icons
- Apply ReactHookForm to AddOrSubtract Component
- Small refactor to Input

# 1.15.1

Add `CheckIcon`, update `CancelIcon` and integrate `SVGIconLoader` into `Alert`

# 1.15.0

Add SVGIconLoader and its Icons: `instagram`, `emoji-smiling`, `facebook-squared`, `twitter`, `linkedin`, `circle`, `menu`, `cancel`, `arrow-left`, `filled-watch`, `filled-error-circle`, `filled-warning-circle`, `filled-check-circle`.

# 1.14.1

- Add afterStyles to Typography.

# 1.14.0

- Refactor `Badged` and `Checkbox` atoms.
- Add type `white` to `Button`.
- Update `Typography` prop-types

# 1.13.10

- Fix `Paragraph` prop-types, helper `type` and its colors.

# 1.13.8

- Add 'Link' type to paragraph.

# 1.13.7

- Add props/styles to Checkbox and Icon
- Fix CheckboxController and OrderItemSnippet.

# 1.13.5

- Add extraStyle to Box and Small `type` to Typography.
- Fix Icon withBackground position.
- Improve OrderItemSnippet semantic.

# 1.13.4

- Update Box html tag, Icon-Image sizes and PreviewItemsList code.
- Delete Dropdown stories.
- Refactor OrderSnippet & ItemSnippetInCard.

# 1.13.3

- Add spred props to Spin component

# 1.13.2

- Improve Spin styles and add testId prop

# 1.13.1

- Remove Dropdown, SizesEnum and FlexboxgridGlobalsClass
- Update Alert, StatusEnum --dir and package

# 1.13.0

- Add OrderSnippet, ItemSnippetInList, & UserSnippet Skeletons
- Fix styles and props into Button, Notice, AddOrSubtract, Alert & OrderItemSnippet
- Add Select component and upperCase StatusEnum.

# 1.12.0

- Add Skeleton dependency and use it into ItemSnippetInCard, OrderItemSnippet.

# 1.11.4

- Fix styles into Badge, Button, Input, SearchBar.

# 1.11.3

- Add default space to Notice.
- Remove extra code to errors in Input.
- Refactor PaymentSnippet.

# 1.11.2

- Update OrderItemSnippet and SearchBar props.
- Add AddOrSubtract molecules

# 1.11.1

- Add RadioController and RadioGroup.
- Add readOnly prop to input and numberOfLines to Typography.

# 1.11.0

- Move Alert to molecules and update disabled style to Button.
- Refactor Spin and add () to register in ref for Input.
- Add Textarea and update Toggle styles.
- Clean Image atom code and update Alert importation in its stories.

# 1.10.4

- Export Controller from react-hook-form

# 1.10.3

- Update Button, Spin and Toggle props

# 1.10.2

- Export useFieldArray from Form

# 1.10.1

- Add disabled to Toggle

# 1.10.0

- Add OrderItemSnippet (Rename from ItemSnippetInList) and ItemSnippetInList (new component).

# 1.9.5

- Add onClick to UserSnippet and add extra story to SearchBar

# 1.9.3

- Refactor SearchBar

# 1.9.1

- Update vertical spaces into ItemSnippetInList, OrderSnippet & PaymentSnippet

# 1.9.0

- Add ImageUploader and update SearchBar logic

# 1.8.4

- Add borders to 'Box' & 'Expand', update sizes to 'Icon' withBackground and 'Toggle'

# 1.8.3

- Add Breadcrumbs, Expand & update some props/logic

# 1.8.1

- Deploy new atoms, molecules and organisms

# 1.7.7

- Export all created components & add 's' to molecule folder

# 1.7.6

- Add Stepper and ItemSnippetInList molecules

# 1.7.5

- Add OrderSnippet and ItemSnippetInCard molecules

# 1.7.4

- Add Box, Notice, Toggle and Badge atoms

# 1.7.3

- Add Alert atom

# 1.7.2

- Add hexToRBGA and add colors on themes

# 1.7.1

- Update Typography and Button

# 1.7.0

- Migrate Storybook from tsx to MDX

# 1.6.1

- Move all utils to @wicadu/utils.

# 1.6.0

- Add Notification atom.

# 1.5.0

- Add useOutsideClick (Hook) and Popover (Molecule).

# 1.4.0

Change name of IconLoad to Icon and export useTheme from Index

# 1.3.12

- Add Spin to Link Button

# 1.3.11

- Remove useMemo for calculate `errors[name]?.message`

# 1.3.10

- Add util matchGraphQLErrors and fix color loading button

# 1.3.9

- Fix button loading size and center and fix input shadow.

# 1.3.8

- Export addClass utils

# 1.3.7

- Add dynamic background color.

# 1.3.6

- Spread props and export LoadIcon.

# 1.3.4

- Add command build:assets and fix required assets in publish dependency

# 1.3.0

- Add Theme, useTheme, fonts and move styles.

# 1.2.0

- Add LoadIcon Atom

# 1.1.11

- Add styles to show errors input feedback.

# 1.1.10

- Remove paddings horizontal and width auto for button type link

# 1.1.9

- Add cursor pointer (Button).

# 1.1.8

- Add new line height for description (Typography).

# 1.1.7

- Add description type (Typography).

# 1.1.6

- Add aling and weight (Typography - default)

# 1.1.5

- Add Typography styles; sizes, weight, align, story documentation and defaultStyles

# 1.1.4

- Add types & outline styles (Input)

# 1.1.3

- Add sizes, fullSizes and some default styles (Input)

# 1.1.2

- Add width in sizes prop and fullWidth to get 100% (Button)

# 1.1.1

- Add color contant, addClass and getSizes utils

# 1.1.0

- Add ButtonStyles and documentation with StoryBook

# 1.0.9

- Add logic for loading and disabled to Button atom

# 1.0.8

- Add Typography atom

# 1.0.7

- Add styles for remove arrows of input:type=number

# 1.0.6

- Fix Default Props and Add Script Deploy

# 1.0.5

- Add Spin Atom

# 1.0.4

- Add Type Link to Button and Add Script for Development

# 1.0.3

- Update Button and remove styled-components

# 1.0.2

- Add Control to Input with React Hook Form

# 1.0.1

- Fix: Add Form Element to Form HOC

# 1.0.0

- Add React Hook Form

# 0.1.0

- Add Input & Button Atoms with stories v1

# 0.0.1

- Add Input/Buttons Atoms and preconfig babel build
