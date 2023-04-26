interface NavItem {
    path: string;
    title: string;
    icon?: string;
}

const links: NavItem[] = [
    {
        path: 'students',
        title: 'Estudiantes',
        icon: 'person'
    },
    {
        path: 'instructors',
        title: 'Tutores',
        icon: 'person'
    },
    {
        path: 'classes',
        title: 'Clases',
        icon: 'person'
    }
]

export default links;