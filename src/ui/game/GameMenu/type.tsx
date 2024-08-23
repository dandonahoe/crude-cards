export interface MenuItemProps {
    onClick : (id : string) => void;
    icon    : React.ReactNode;
    text    : string;
    id      : string;
}
