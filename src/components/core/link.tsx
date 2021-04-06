import classNames from "classnames";
import { ReactNode } from "react";
import { site } from "../../constants/site";

interface IProps {
    href: string;
    additionalClassNames?: string;
    children?: ReactNode;
}
export const BasicLink = (props: IProps) => {
    const appendRef = (baseUrl: string) => {
        if (baseUrl.includes('@')) return baseUrl;
        if (baseUrl.includes('?')) {
            return baseUrl + `&ref=${site.ref}`;
        }
        return baseUrl + `?ref=${site.ref}`;
    };

    return (
        <a
            href={appendRef(props.href)}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(props.additionalClassNames ?? '')}
            draggable={false}>
            {props.children}
        </a>
    );
}