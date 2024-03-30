import { useI18NContext } from "../../i18n";

type UserProps = {
  user: {firstName: string};
}

export default function UserInfo(props: UserProps) {
  const { user: { firstName } } = props;

  const { _, _n, _c, _cn } = useI18NContext();

  return (
    <div className="flex">
      {_("My name is {firstName}", {firstName})}
    </div>
  );
}
