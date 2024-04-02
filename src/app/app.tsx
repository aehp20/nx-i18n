import { useI18NContext } from "../i18n";
import Title from "./components/Title";
import UserInfo from "./components/UserInfo";

export function App() {
  const user = { firstName: "Fanny" };

  const { setLocale, _, _n, _c, _cn } = useI18NContext();

  const handleES = () => {
    setLocale("es")
  }
  const handleEN = () => {
    setLocale("en")
  }
  const handleFR = () => {
    setLocale("fr")
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <button onClick={handleES}>{_("ES")}</button>
        <button onClick={handleEN}>{_("EN")}</button>
        <button onClick={handleFR}>{_("FR")}</button>
      </div>

      <Title>{_("Document")}</Title>
      <UserInfo user={user} />

      <div>{_("This is my i18n lib")}</div>
      <div>{_("This {object} is a new entity", {object: "RobotR2"})}</div>
      <div>{_("This {object} is a new entity", {object: "RobotR3"})}</div>
      <div>{_("This {object} is a new entity", {object: 1000})}</div>
      <div>{_("Hello")}</div>
      <div>{_("How are you?")}</div>
      <div>{_("Thanks")}</div>

      <div>{_n("I have one car", "I have two cars", 1)}</div>
      <div>{_n("I have one car", "I have two cars", 2)}</div>
      <div>{_n("I have one car", "I have two cars", 0)}</div>
      <div>{_n("{name} and {name2} have one car", "{name} and {name2} have two cars", 1, {name: "Peter", name2: "Sarah"})}</div>
      <div>{_n("{name} and {name2} have one car", "{name} and {name2} have two cars", 2, {name: "Peter", name2: "Sarah"})}</div>

      <div>{_c("ExampleContext", "This message is under a context")}</div>
      <div>{_c("ExampleContext", "This {data} is under a context", {data: "PCU2"})}</div>
      <div>{_c("ExampleContext", "This {object} is under a context", {object: "MachineT2"})}</div>

      <div>{_cn("NewContext", "Document", "Documents", 1)}</div>
      <div>{_cn("NewContext", "Book", "Books", 2)}</div>
      <div>{_cn("NewContext", "My boy {name} has one car", "My boy {name} has many cars", 1, {name: "John"})}</div>
      <div>{_cn("NewContext", "My boy {name} has one car", "My boy {name} has many cars", 2, {name: "John"})}</div>
    </div>
  );
}

export default App;
