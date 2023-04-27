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
        path: 'subjects',
        title: 'Asignaturas',
        icon: 'person'
    },
    {
        path: 'enroll',
        title: 'Inscripciones',
        icon: 'person'
    }
]

export default links;