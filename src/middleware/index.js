import { parse } from 'cookie';

const authMiddleware = (handler) => {
    return async (context) => {
        const { req, res } = context;

        const cookies = parse(req.headers.cookie || '');

        if (req.url === '/admin/auth') {
            if (cookies['token']) {
                res.writeHead(302, { Location: '/admin/dashboard/profile/' });
                res.end();
                return { props: {} };
            }
        } else if (req.url === '/admin/dashboard/') {
            if (!cookies['token']) {
                res.writeHead(302, { Location: '/admin/auth/' });
                res.end();
                return { props: {} };
            }
        }

        if (!cookies['token'] && req.url === '/admin/dashboard/profile/') {
            res.writeHead(302, { Location: '/admin/auth/' });
            res.end();
            return { props: {} };
        }

        if (!cookies['token'] && req.url === '/admin/dashboard/user/') {
            res.writeHead(302, { Location: '/admin/auth/' });
            res.end();
            return { props: {} };
        }

        if (!cookies['token'] && req.url === '/admin/dashboard/project/') {
            res.writeHead(302, { Location: '/admin/auth/' });
            res.end();
            return { props: {} };
        }

        if (!cookies['token'] && req.url === '/admin/dashboard/team/') {
            res.writeHead(302, { Location: '/admin/auth/' });
            res.end();
            return { props: {} };
        }

        if (cookies['token'] && req.url === '/admin/auth/') {
            res.writeHead(302, { Location: '/admin/dashboard/profile/' });
            res.end();
            return { props: {} };
        }


        //user

        if (req.url === '/user/auth') {
            if (cookies['token']) {
                res.writeHead(302, { Location: '/admin/dashboard/profile/' });
                res.end();
                return { props: {} };
            }
        } else if (req.url === '/user/dashboard/') {
            if (!cookies['token']) {
                res.writeHead(302, { Location: '/user/auth/' });
                res.end();
                return { props: {} };
            }
        }


        return await handler(context);
    };
};

export default authMiddleware;