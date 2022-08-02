import { Component } from 'react';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                dirty: false,
            }
        }
    }

    _getInitFormData(data) {
        let formData = {};
        Object.keys(data).forEach(k => {
            formData[k] = {
                value: data[k],
                err: '',
            }
        })
        formData.dirty = false;
        return formData;
    }

    _fillForm = (data) => {
        this.setState(prevState => {
            let form = {};
            Object.keys(data).forEach(k => {
                form[k] = {
                    value: data[k],
                    err: '',
                }
            })
            form.dirty = false;
            prevState.form = form;
            return prevState;
        })
    }

    _setValueNotCheck = (ev, key) => {
        ev.persist();
        this.setState(prevState => {
            prevState.form.dirty = false;
            prevState.form[key] = {
                value: ev.target.value,
                err: '',
            }
            return prevState;
        });
    }


    _setValue = (ev, key) => {
        ev.persist();
        this.setState(prevState => {
            prevState.form.dirty = false;
            prevState.form[key] = {
                value: ev.target.value,
                err: this._getInvalidErr(ev.target),
            }
            return prevState;
        });
    }

    _getInvalidErr(domEl) {
        if (domEl.validity.valid) return '';
        if (domEl.type === 'email' && domEl.validity.typeMismatch) return ERR_MSG.EMAIL;
        if (domEl.validity.valueMissing) return ERR_MSG.REQUIRED;
        if (domEl.validity.rangeOverflow) return ERR_MSG.MAX + domEl.max;
        if (domEl.validity.rangeUnderflow) return ERR_MSG.MIN + domEl.min;
        if (domEl.validity.tooLong) return ERR_MSG.MAX_LENGTH + domEl.maxLength;
        if (domEl.validity.tooShort) return ERR_MSG.MIN_LENGTH + domEl.minLength;
        if (domEl.validity.patternMismatch && domEl.pattern === REGEX_TEL) return ERR_MSG.P_TEL;
        return 'Got err'
    }

    _validateForm() {
        let formData = this.state.form;
        let isValid = true;
        Object.keys(formData).forEach(k => {
            if (k !== 'dirty') {
                let domEl = document.getElementsByName(k);
                if (domEl[0]) {
                    formData[k].err = this._getInvalidErr(domEl[0]);
                    if(formData[k].err !== '') {
                        isValid = false;
                    }
                }
            }
        })
        formData['dirty'] = !isValid;
        this.setState({ form: formData })
    }

    _isFormValid() {
        let formData = this.state.form;
        return !Object.keys(formData).find(k => !!formData[k].err);
    }
}

export default Form;