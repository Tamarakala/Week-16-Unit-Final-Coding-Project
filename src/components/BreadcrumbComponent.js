import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';

const routeNames = {
    '/': 'Home',
    '/add-product': 'Add Product',
    // Define other paths and their names here
};

const BreadcrumbComponent = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    const paths = [];

    // Build the path incrementally to match against the routeNames keys
    pathnames.reduce((prev, curr) => {
        const fullPath = `${prev}/${curr}`;
        paths.push(fullPath);
        return fullPath;
    }, '');

    return (
        <Breadcrumb>
            {paths.map((path, index) => {
                // Only add breadcrumb items for paths defined in routeNames
                if (!routeNames[path]) return null;

                const isActive = index === paths.length - 1;
                return (
                    <Breadcrumb.Item key={path} active={isActive} linkAs={isActive ? undefined : Link} linkProps={isActive ? {} : { to: path }}>
                        {routeNames[path] || path}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};

export default BreadcrumbComponent;
