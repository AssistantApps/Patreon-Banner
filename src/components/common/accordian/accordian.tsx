import React, { ReactNode } from 'react';

interface IAccordianProps {
    id: string;
    title: string;
    defaultChecked?: boolean;
    content: ReactNode;
}

interface IProps {
    list: Array<IAccordianProps>;
}

export const Accordian: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="tabs">
            {
                props.list.map((listItem: IAccordianProps, index: number) => {
                    const unique = `${listItem.id}-${index}`;
                    return (
                        <div key={unique} className="tab">
                            <input id={unique} type="checkbox" className="acc" defaultChecked={listItem.defaultChecked ?? false} />
                            <label className="tab-label" htmlFor={unique}>{listItem.title}</label>
                            <div className="tab-content">{listItem.content}</div>
                        </div>
                    );
                })
            }
        </div>
    );
}
