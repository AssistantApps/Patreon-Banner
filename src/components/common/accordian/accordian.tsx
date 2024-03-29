import React, { ReactNode } from 'react';

interface IAccordianProps {
    id: string;
    title: string;
    checked?: boolean;
    content: ReactNode;
}

interface IProps {
    list: Array<IAccordianProps>;
    onClick: (index: number) => void;
}

export const Accordian: React.FC<IProps> = (props: IProps) => {
    const onClick = (index: number) => (e: any) => {
        e.preventDefault();
        props?.onClick?.(index);
    }

    return (
        <div className="tabs">
            {
                props.list.map((listItem: IAccordianProps, index: number) => {
                    const unique = `${listItem.id}-${index}`;
                    return (
                        <div key={unique} className="tab" onClick={onClick(index)}>
                            <input id={unique} type="checkbox" className="acc" checked={listItem.checked ?? false} />
                            <label className="tab-label" htmlFor={unique}>{listItem.title}</label>
                            <div className="tab-content">{listItem.content}</div>
                        </div>
                    );
                })
            }
        </div>
    );
}
