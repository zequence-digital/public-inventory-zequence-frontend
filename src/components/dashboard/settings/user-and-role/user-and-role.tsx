import { ActiveUsers } from "./active-users";
import { InviteUser } from "./invite-user";
import { InvitedUsers } from "./invited-users";

export function UsersAndRole() {
  return (
    <>
      <InviteUser />
      <ActiveUsers />
      <InvitedUsers />
    </>
  );
}
