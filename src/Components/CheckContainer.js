export default function CheckbtnContainer() {
  return (
    <>
      <div className="checkbtnContainer bg">
        <div className="checkboxBox">
          <input type="checkbox" />
          <span>{"Include Uppercase Letters"}</span>
        </div>
        <div className="checkboxBox">
          <input type="checkbox" />
          <span>{"Include Lowercase Letters"}</span>
        </div>
        <div className="checkboxBox">
          <input type="checkbox" />
          <span>{"Include Numbers"}</span>
        </div>
        <div className="checkboxBox">
          <input type="checkbox" />
          <span>{"Include Symbols"}</span>
        </div>
      </div>
    </>
  );
}
