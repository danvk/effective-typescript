# Item 37: Limit the Use of Optional Properties

## Things to Remember

- Optional properties can prevent the type checker from finding bugs and can lead to repeated and possibly inconsistent code for filling in default values.
- Think twice before adding an optional property to an interface. Consider whether you could make it required instead.
- Consider creating distinct types for un-normalized input data and normalized data for use in your code.
- Avoid a combinatorial explosion of options.

## Code Samples

```ts
interface FormattedValue {
  value: number;
  units: string;
}
function formatValue(value: FormattedValue) { /* ... */ }
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGIHsoFs5kgEwDU4AbAVxQG8AoZZAN1IoC5kQysAjaAbluTIhgYAM6sRYKKADmfAL7UYghGGDoQyGJhxhi5CAApG+1hmy4CeigEpklZAHoAVMgB075E4fIFQA)

----

```ts
interface Hike {
  miles: number;
  hours: number;
}
function formatHike({miles, hours}: Hike) {
  const distanceDisplay = formatValue({value: miles, units: 'miles'});
  const paceDisplay = formatValue({value: miles / hours, units: 'mph'});
  return `${distanceDisplay} at ${paceDisplay}`;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/JYOwLgpgTgZghgYwgAgGIHsoFs5kgEwDU4AbAVxQG8AoZZAN1IoC5kQysAjaAbluTIhgYAM6sRYKKADmfAL7UYghGGDoQyGJhxhi5CAApG+1hmy4CeigEpklZAHoAVMgB075E4fIFoSLEQUAAlgAGsqfixgEggxNg5uKD46AAt0Mig49i5eagUlEBU1DS1zMBDwg0oomJEAGmQ0jJE5VgqIWxo6BHUJZHxgCThCiAARQYAHEjgAT2QAXk1tXCtDSmMWZBrYhsFhOIBybZEDuWtk5B6QPonA8ZEp2YWlstWqjYhWY8dG9MzdoSiVhHCYpU7nfhQCBgDIaAAGABJKAMhiN7o8ZnJkLhkEjbkh0dNMXD5NQgA)

----

```ts
type UnitSystem = 'metric' | 'imperial';
interface FormattedValue {
  value: number;
  units: string;
  /** default is imperial */
  unitSystem?: UnitSystem;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAqgdgS2AZRAZ2BAtlAvFAciwmACcEBjAqAH0IS0nIEMAbAgbgCgE5NSAZswrQAYgHtSWZsEwATAGpsArtADeXKFABuKiAC4ocZVgBGEUty3LEwNIYzk4AcytQA9ACpPUORCHKrMBQCGghjBYIbFCe7ppQNkioGNgA-IbwSeiYWNwAvlxAA)

----

```ts
interface AppConfig {
  darkMode: boolean;
  // ... other settings ...
  /** default is imperial */
  unitSystem?: UnitSystem;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAqgdgS2AZRAZ2BAtlAvFAciwmACcEBjAqAH0IS0nIEMAbAgbgCgE5NSAZswrQAYgHtSWZsEwATAGpsArtADeXKFABuKiAC4ocZVgBGEUty3LEwNIYzk4AcytQA9ACpPUORCHKrMBQCGghjBYIbFCe7ppQNkioGNgA-IbwSeiYWNwAvjx8FkIiUACCYGAAwuJwAgjOUBpacsykANYAsuJ+hqbi4qwQzHBu7u5QAHTTUOLAABYWUGgkwLzOYdOT8V4+fgFBIWEMTFGsMXHWtsk56bDX2dj5XEA)

----

```ts
function formatHike({miles, hours}: Hike, config: AppConfig) {
  const { unitSystem } = config;
  const distanceDisplay = formatValue({
    value: miles, units: 'miles', unitSystem
  });
  const paceDisplay = formatValue({
    value: miles / hours, units: 'mph'  // forgot unitSystem, oops!
  });
  return `${distanceDisplay} at ${paceDisplay}`;
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAqgdgS2AZRAZ2BAtlAvFAciwmACcEBjAqAH0IS0nIEMAbAgbgCgE5NSAZswrQAYgHtSWZsEwATAGpsArtADeXKFABuKiAC4ocZVgBGEUty3LEwNIYzk4AcytQA9ACpPUORCHKrMBQCGghjBYIbFCe7ppQNkioGNgA-IbwSeiYWNwAvjx8FkIiUACCYGAAwuJwAgjOUBpacsykANYAsuJ+hqbi4qwQzHBu7u5QAHTTUOLAABYWUGgkwLzOYdOT8V4+fgFBIWEMTFGsMXHWtsk56bDX2dj5hfwl0AASCO3q8VgIQ-YjCZzJZ4vNxMpSIDjGYLM8BDYKGtalABJJpMAlKxVAAKXTYgxQCRSGTyLGqACUTQ8Pi2FygBQRcCRCBRaJJwE+3xxaj+AIANFBwZC0HlDFyIIKKLV6s5DBVqjKGlTmlBpXAMNTEihHjg8ng1UrXPF1Zq5KFgCMRAARUJgVjMEAG9kY8kQHnxLT41SGPkQNCC7WAoj-f0EQMPFJYeJ5CluU3BMDCCC2tD2x3O9EyN0erRevS+0NhCbCqERpDBxjzageCbs5xzBKRnKCgZgNAAQhjcfipBIkLgUAABgASNTmjBWlN2h0gfUyKBjpM2meOvJD55AA)

----

```ts
declare let config: AppConfig;
const unitSystem = config.unitSystem ?? 'imperial';
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAqgdgS2AZRAZ2BAtlAvFAciwmACcEBjAqAH0IS0nIEMAbAgbgCgE5NSAZswrQAYgHtSWZsEwATAGpsArtADeXKFABuKiAC4ocZVgBGEUty3LEwNIYzk4AcytQA9ACpPUORCHKrMBQCGghjBYIbFCe7ppQNkioGNgA-IbwSeiYWNwAvjx8FkIiUACCYGAAwuJwAgjOUBpacsykANYAsuJ+hqbi4qwQzHBu7u5QAHTTUOLAABYWUGgkwLzOYdOT8V4+fgFBIWEMTFGsMXHWtsk56bDX2dj5hfwl0AASCO3q8VgIQ-YjCZzJZ4vNxMpSIDjGYLM8BDYKGtalABJJpMAlKxVAAKXTYgxQCRSGTyLGqACUTQ8Pi2FygBT8FFYbWgQ2CFFq9Wchgq1S5DW4nLgGASDxSOHwwu5k0SKEeOFSqXoERY7G4QA)

----

```ts
const unitSystem = config.unitSystem ?? 'metric';
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAqgdgS2AZRAZ2BAtlAvFAciwmACcEBjAqAH0IS0nIEMAbAgbgCgE5NSAZswrQAYgHtSWZsEwATAGpsArtADeXKFABuKiAC4ocZVgBGEUty3LEwNIYzk4AcytQA9ACpPUORCHKrMBQCGghjBYIbFCe7ppQNkioGNgA-IbwSeiYWNwAvjx8FkIiUACCYGAAwuJwAgjOUBpacsykANYAsuJ+hqbi4qwQzHBu7u5QAHTTUOLAABYWUGgkwLzOYdOT8V4+fgFBIWEMTFGsMXHWtsk56bDX2dj5hfwl0AASCO3q8VgIQ-YjCZzJZ4vNxMpSIDjGYLM8BDYKGtalABJJpMAlKxVAAKXTYgxQCRSGTyLGqACUTQ8Pi2FygBT8FFYbWgQ2CFFq9Wchgq1S5DW4nLgGASDxSOHwwu5k0SKEeOFSqUIxDIlE4XCAA)

----

```ts
interface InputAppConfig {
  darkMode: boolean;
  // ... other settings ...
  /** default is imperial */
  unitSystem?: UnitSystem;
}
interface AppConfig extends InputAppConfig {
  unitSystem: UnitSystem;  // required
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAqgdgS2AZRAZ2BAtlAvFAciwmACcEBjAqAH0IS0nIEMAbAgbgCgE5NSAZswrQAknDABXYAEEwYAMIB7OAIQBzKAG8uUKABNmpANYBZJfogAuKACMlS1hGZxuegPTuoAOl9QlwAAWEKRQaCTAvOpoPr66UO4AVIkGEEKSrMBQCDEMTAhsUInu8ZKIKOiYWAD8NvBIqBjY3AC+PHwhQiJQcooqapoQAB6YcPox4lKy8sqqGtql5Y1VdUuVzR5epBAAjpII2-pcbUA)

----

```ts
function normalizeAppConfig(inputConfig: InputAppConfig): AppConfig {
  return {
    ...inputConfig,
    unitSystem: inputConfig.unitSystem ?? 'imperial',
  };
}
```

[💻 playground](https://www.typescriptlang.org/play/?ts=5.4.5#code/C4TwDgpgBAqgdgS2AZRAZ2BAtlAvFAciwmACcEBjAqAH0IS0nIEMAbAgbgCgE5NSAZswrQAknDABXYAEEwYAMIB7OAIQBzKAG8uUKABNmpANYBZJfogAuKACMlS1hGZxuegPTuoAOl9QlwAAWEKRQaCTAvOpoPr66UO4AVIkGEEKSrMBQCDEMTAhsUInu8ZKIKOiYWAD8NvBIqBjY3AC+PHwhQiJQcooqapoQAB6YcPox4lKy8sqqGtql5Y1VdUuVzR5epBAAjpII2-pcbQJlFJEqUHBKpFhsCABeEL2zAwAUvFOvGjaT0i-9DQAShsALmmh0em2wEkpDgCz0el83k+0m+6gANPE9GUGussDZUcB0d5cRUmjhqtV6IwQgV2Fi9C1WlwgA)
