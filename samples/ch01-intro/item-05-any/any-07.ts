interface ComponentProps {
  onSelectItem: (item: any) => void;
}
function renderSelector(props: ComponentProps) { /* ... */ }

let selectedId: number = 0;
function handleSelectItem(item: any) {
  selectedId = item.id;
}

renderSelector({onSelectItem: handleSelectItem});
