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
        icon: 'school'
    },
    {
        path: 'enroll',
        title: 'Inscripciones',
        icon: 'assignment_turned_in'
    },
    {
        path: 'users',
        title: 'Usuarios',
        icon: 'portrait'
    }
]

export default links;
