interface GenericObject<T> {
  [key: string]: T | undefined;
}

interface DesignerInfo extends GenericObject<number> {}

interface SocketUser extends UserType {
  socket_id?: string | undefined;
}

interface TeamMember {
  id?: number;
  name?: string;
  avatar?: string;
}

interface Events {
  id: number;
  title: string;
  week: number;
  teamMembers: TeamMember[];
}

interface UserType extends GenericObject<string> {
  purchasedProducts: number | undefined;
  designerInfo?: DesignerInfo;
}