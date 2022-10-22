# Usage

`custom.d.ts` should be placed in `src/` directory of your React app, it helps to handle image files in React.

Please, install all dev dependencies, using:

```
npm i -D eslint@8.2.0 @babel/cli@7.16.0 @babel/core@7.16.5 @babel/eslint-parser@7.19.1 @babel/runtime@7.16.5 eslint-config-airbnb@19.0.4 eslint-config-prettier@7.1.0 eslint-import-resolver-alias@1.1.2 eslint-plugin-import@2.26.0 eslint-plugin-jest@24.3.6 eslint-plugin-jsx-a11y@6.6.1 eslint-plugin-react@7.31.10 eslint-plugin-react-hooks@4.6.0 eslint-plugin-simple-import-sort@7.0.0 @typescript-eslint/eslint-plugin@5.40.1 @typescript-eslint/parser@5.40.1 prettier@2.2.1
```

# Code-style 🎩

- **No export default**

💡 **Why?** By avoiding the `export default`, we’ll be obligated to import the component under the same name in all the
files, meaning we’ll

- be more **coherent**
- avoid **typos**
- **find** the component usages easily

- **For each feature directory, define the `consts` in a separate file called `consts.ts`.**
- **Eslint** if there is a rule you wish to add to enforce new behavior try to come up with to the group as an open
  discussion – we are more than happy to reduce our mental capacity when reviewing code 😇

- **No redundant context** Do not repeat unnecessary words in the file name/properties.

  **Don't:**

  ```jsx
  ../components/CheckedFilter/CheckedFilterMenu/CheckedFilterMenuItem.tsx
  ```

  **Do:**

  ```jsx
  ../components/CheckedFilter/Menu/Item.tsx
  ```

  **Don't:**

  ```jsx
  const bill = {
  	billDetails: 'Yo yo whatsup dog',
  }
  ```

  **Do:**

  ```jsx
  const bill = {
  	details: 'Yo yo whatsup dog',
  }
  ```

- **Do not use `moment.js` use `date-fns`** since `moment.js` is deprecated we use `date-fns` as an alternative

  **Don't:**

  ```jsx
  const date = moment().format('yyyy-mm-d')
  ```

  **Do:**

  ```jsx
  import { format, getYear, isBefore } from 'date-fns'
  import { DATE_FORMATS } from 'src/utils/date-fns'

  format(new Date(), DATE_FORMATS.monthShortWithDateAndYear)
  ```

- **Prefer to define parameters of a function as object when there are more than 2 parameters (and not parameters
  list)** Maintaining a parameters list is hard when you have more than 2 parameters because you must be strict with
  their order, and handling default values when you want to add new parameters is not fun. On the other hand, objects
  let you much more space and freedom and are much more self-explained (because they force you to mention the object's
  properties when passing the values to the function).
- Another thing, when you need to pass a single `boolean` value that's used as a flag, always use an `object`,
  otherwise, the function’s usage will be unreadable and the meaning of the `true/false` value won’t be clear.
  **Don't:**

  ```jsx
  const a = (paramA, paramB, paramC) => {
  	bla bla bla...
  };
  ```

  **Do:**

  ```jsx
  const a = ({ paramA, paramB, paramC }) => {
  	bla bla bla...
  };
  ```

  **Don't:**

  ```jsx
  const createFlower = (shouldCreateSomeBlaBla) => {
  	bla bla bla...
  };

  // I have no idea what `true` stands for
  createFlower(true);
  ```

  **Do:**

  ```jsx
  const createFlower = (params: { shouldCreateSomeBlaBla: boolean }) => {
  	bla bla bla...
  };

  createFlower({ shouldCreateSomeBlaBla: true });
  ```

## Utils 🏗️

- Do not mix `tsx` and `ts` files:
- TSX - will be a component file that returns a component - it won’t be a util function that returns a component.
- TS - will be used as a util\const\style\type file and will only include javascript (and not React)
- Each Util file should be placed under the relevant page\component\module. We want to make sure that the util
  function\file will be placed in the utmost relevant place.
- Utils that are being used in more than one place should go up to the lowest common level possible
- Every shared util function should have a unit test.

## Redux 👾

**Don't:**

```tsx
import { createRestfulSlice } from 'src/helpers/redux/createRestfulSlice'
import { API } from './api'

const someStore = createRestfulSlice({
	api: API,
})
```

**Do:**

```tsx
import { createFetchSlice } from 'src/helpers/redux/restFetchSlice'
import { hashListKey } from 'src/helpers/redux/createRestfulSlice'
import { createListSlice } from 'src/helpers/redux/restListSlice'
import { createDeleteSlice } from 'src/helpers/redux/restDeleteSlice'
import { getProApi } from 'src/modules/get-pro/api'
import { name } from './consts'

// fetch
export const proPaidPaymentsFetchSlice = createFetchSlice({
	storeName: name,
	actionName: 'proFetch',
	api: getProApi.paid.fetch,
})

// list
export const proInvoicesListSlice = createListSlice({
	storeName: name,
	api: getProApi.invoices.list,
	actionName: 'proList',
	listHashFunc: hashListKey,
})

// delete
export const proPaidPaymentsMarkAsUnpaidSlice = createDeleteSlice({
	storeName: name,
	api: getProApi.paid.markAsUnpaid,
	actionName: 'proMarkAsUnpaid',
})
```

## **Components** 🧊

- Prefer to use functional components over Class components.
- Prop types should sit inside the component (unless they are shared - see next bullet)

  **Don't:**

  ```jsx
  export type SomeComponentPropsType = {
  	// ...
  	}

  import { SomeComponentPropsType } from '..'

  const myComponent = ({...}: SomeComponentPropsType) => ...
  ```

  **Do:**

  ```jsx
  type Props = {
  	// ...
  	}

  const myComponent = ({...}: Props) => ...

  ```

  - If the Prop types are Shared you can do the following:

  ```tsx
  import { ComponentProps } from 'react'

  ComponentProps<typeof MyComp>
  ```

- Avoid using render functions of components inside a component

## Hooks 🪝

- We do **not** export components from hooks.
- Refrain from using HOC - use hooks instead

  **Don't:**

  ```jsx
  const ListPage = compose(withNavigator())(ListPageComp)
  ```

  **Do:**

  ```jsx
  const ListPage = ({ ...rest }: ListPageProps) => {
  	// This is the prop that was passed from the HOC
  	const location = useLocation();

  return (
  <ListContainer
  path={location.pathname}
  >
  <ListContent>
  	...
  	</ListContainer>
  	);
  };
  ```

## Naming 📛

- **Constants**
- Constants files will be called `consts.ts` (and not `constants.ts`).
- Import specific consts and not the whole object

  **Don't:**

  ```jsx
  import { CONSTS } from 'src/utils/consts'
  ```

  **Do:**

  ```jsx
  import { CURRENCY } from 'src/utils/consts'
  ```

- **Actions**
- Prefer naming actions with `handle` prefix

  **Don't:**

  ```jsx
  const click = () => ...

  onClick={click}
  ```

  **Do:**

  ```jsx
  const handleClick = () => ...

  onClick={handleClick}
  ```

- **Types**
- When writing types (excluding props types) use the suffix `Type`:

  **Don't:**

  ```jsx
  export type Payment = {
  	// ...
  }
  ```

  **Do:**

  ```jsx
  export type PaymentType = {
  	// ...
  }
  ```

- Entity type (Payment, Bill, PaymentRequest, etc) should be sitting under each module, under `src/modules`.
- Prop types should be inside each component.
- UI Types should be in a type file next to the relevant pages.
- **Enums**
- Only export enum and not const enum:

  **Don't:**

  ```tsx
  export const enum Bool {
  	True,
  	False,
  	FileNotFound,
  }
  let value = Bool.FileNotFound
  // value will transpile to 2

  let value = 2 /* FileNotFound */
  ```

  **Do:**

  ```tsx
  export enum Bool {
  	True,
  	False,
  	FileNotFound,
  }
  let value = Bool.FileNotFound

  // this will transpile into this
  var Bool
  ;(function (Bool) {
  	Bool[(Bool['True'] = 0)] = 'True'
  	Bool[(Bool['False'] = 1)] = 'False'
  	Bool[(Bool['FileNotFound'] = 2)] = 'FileNotFound'
  })(Bool || (Bool = {}))
  let value = Bool.FileNotFound
  ```

- No Need to create a type for an enum unless you need specific values from the enum.
- Enums should be written in Pascal's case:

  **Don't:**

  ```tsx
  enum SOME_ENUM { ... }
  ```

  **Do:**

  ```jsx
  enum SomeEnum { ... }
  ```

### Analytics 📊

- **Event Mapping**
- Prefer to use event-mapping for all the analytics events

  **Don't:**

  ```tsx
  analytics.track('name-of-page', 'continue')
  ```

  **Do:**

  ```tsx
  // event-mapping.ts
  const MAPPING = {
  	'route-to-where-we-want-the-event': {
  		'button.continue': ['name-of-page', 'continue'],
  	},
  }

  // component.tsx
  analytics.trackAction('button.continue')
  // most of the time this is done automatically by the component
  // so you will only need to add the event mapping.
  ```

- We do use sometimes `analytics.track`
- When we want to send a specific event that’s unrelated to any UI action
- When the event requires some special logic
- Redux event mapping
- We can use event-mapping for redux action (success, failure, request) and this will fire an event automatically on
  each success or error action from the slice, and this is how we do it:

  ```tsx
  // event-mapping.ts
  import { mapApiSlice } from 'src/services/analytics/event-mapping-utils';

  const MAPPING: {
  	'route': {
  		...mapApiSlice(
  		'[ORGANIZATION] UPDATE_ORGANIZATION_PREFERENCE', // name of the slice
  		'onboarding-company-info-industry', // page name
  		'update-onboarding-industry-id' // event name
  		)
  	}
  }
  ```

## **Design System** 💅

- For any Icon in our web solution use only the icons from the design system - we have a legacy icon pack so if you
  can’t find it in the design system your Icon contact @Yotam Bloom so we can add it.

  **Don't:**

  ```tsx
  import React from 'react'
  import Box from 'src/core/ds/box'

  const Example = () => <Box as="i" className="icon-check-icon" />
  ```

  **Do:**

  ```tsx
  import React from 'react'
  import { Icon, IconNames, IconSize } from 'src/core/ds/icon'

  const Example = () => <Icon name={IconNames.check} size={IconSize.lg} />
  ```
