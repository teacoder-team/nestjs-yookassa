export interface NavItem {
	title: string
	url?: string
}

export interface NavItemWithChildren extends NavItem {
	items?: NavItemWithChildren[]
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}
