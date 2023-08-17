
export interface ValidateConfig {
    value: string | number,
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    minVal?: number;
    maxVal?: number;
}
export const validate = (config: ValidateConfig): boolean => {
    let isValid = true;

    if (config.required) {
        isValid = isValid && config.value.toString().trim().length !== 0
    }
    if (config.minLength && typeof config.value === 'string') {
        isValid = isValid && config.value.trim().length >= config.minLength
    }
    if (config.maxLength && typeof config.value === 'string') {
        isValid = isValid && config.value.trim().length <= config.maxLength
    }
    if (config.minVal && typeof config.value === 'number') {
        isValid = isValid && config.value >= config.minVal
    }
    if (config.maxVal && typeof config.value === 'number') {
        isValid = isValid && config.value <= config.maxVal
    }
    if ((config.maxVal || config.minVal) && typeof config.value !== 'number') {
        isValid = false
    }

    return isValid;
}
//////////////
//DECORATORS//
//////////////

export const BindMethod = (_target: any, _name: string, descriptor: PropertyDescriptor) => {
    const targetMethod = descriptor.value;
    const newMethodConfig: PropertyDescriptor = {
        enumerable: false,
        configurable: true,
        get() {
            const boundMethod = targetMethod.bind(this);
            return boundMethod
        }
    }

    return newMethodConfig;
}
