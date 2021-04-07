import classNames from 'classnames';
import React from 'react';
import { Result, defaultSuccessResult } from '../../../contracts/results/ResultWithValue';
import { ErrorLabel } from '../validation/errorLabel';

interface IProps {
    id: string;
    name: string;
    label?: string;
    value: string;
    pattern?: string;
    onChange: (value: string) => void;
    isValid?: () => Result;
    placeholder: string;
    showValidation?: boolean;
}

interface IState {
    showValidation: boolean;
}

export class TextInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            showValidation: false,
        };
    }

    onChangeEvent = (event: any) => {
        event.persist();
        const value = event?.target?.value ?? '';
        this.props.onChange?.(value);
    }

    onBlur = () => {
        if (this.props.isValid == null) return;
        this.setState(() => {
            return {
                showValidation: true,
            }
        })
    }

    render() {
        const showValidation = this.state.showValidation || this.props.showValidation;
        const validationResult: Result = this.props.isValid != null && showValidation
            ? this.props.isValid()
            : defaultSuccessResult;

        return (
            <>
                {
                    this.props.label &&
                    <label htmlFor={this.props.name} style={{ margin: 0 }}>{this.props.label}</label>
                }
                <input type="text"
                    id={this.props.id}
                    name={this.props.name}
                    value={this.props.value ?? ''}
                    pattern={this.props.pattern}
                    onChange={this.onChangeEvent}
                    className={classNames({ 'error': !validationResult.isSuccess })}
                    placeholder={this.props.placeholder}
                    onBlur={this.onBlur}
                />
                {
                    showValidation &&
                    <ErrorLabel htmlFor={this.props.name} {...validationResult} />
                }
            </>
        );
    }
}