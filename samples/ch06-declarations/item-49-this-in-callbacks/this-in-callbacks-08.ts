declare function makeButton(props: {text: string, onClick: () => void }): void;
class ResetButton {
  render() {
    return makeButton({text: 'Reset', onClick: this.onClick});
  }
  onClick = () => {
    alert(`Reset ${this}`);  // "this" always refers to the ResetButton instance.
  }
}
