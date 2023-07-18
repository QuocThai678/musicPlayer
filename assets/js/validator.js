// Đối tượng `Validator`
function Validator (options) {
    var selectorRules = {};

    function getParent (element, selector) {
        while(element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    //  Hàm thực hiện validate
    function validate (inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorElement)
        var rules = selectorRules[rule.selector]
        let errorMessage ;

        for (var i = 0 ; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'checkbox':
                case 'radio':
                    errorMessage = rules[i](
                        formElement.querySelector('input[name="gender"]' + ':checked')
                    )
                    break;
                default:
                    errorMessage = rules[i](inputElement.value)
            }

            if (errorMessage) {
                break;
            }
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        }
        else {
            errorElement.innerText = ''
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
        }
        return !errorMessage;
    }
    // Lấy element của form 
    const formElement = document.querySelector(options.form)
    if (formElement) {
        options.rules.forEach(function(rule) {
            var inputElements = formElement.querySelectorAll(rule.selector)

            Array.from(inputElements).forEach (inputElement => {
                // Xử lí trường hợp blur khỏi input 
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }

                // Xử lí mỗi khi người dùng nhập vào input 
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorElement)
                    errorElement.innerText = ''
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
                }
            }) 

            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            }
            else {
                selectorRules[rule.selector] = [rule.test]
            }
        })

        formElement.onsubmit = function (e) {
            e.preventDefault()
            var formStatus =  true
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector)
                    var valid = validate(inputElement, rule)
                    if (!valid) {
                        formStatus =false
                    }  
            })
            if (formStatus) {
                if (typeof options.onSubmit == 'function') {
                    var inputs = formElement.querySelectorAll('[name]')
                    var formValues = Array.from(inputs).reduce(function(data, input) {
                        switch(input.type) {
                            case'radio':
                                if(input.matches(':checked')) {
                                    data[input.name] = formElement.querySelector(`input[name = "${input.name}"]:checked`).value
                                }
                                break;

                            case'checkbox':
                                if (!Array.isArray(data[input.name])) {
                                    data[input.name] = []
                                }

                                if (input.matches(':checked')) {
                                    data[input.name].push(input.value)
                                }

                                if (data[input.name].length == 0) {
                                    data[input.name] = '';
                                }

                                break;
                            case'file':
                                const nameSong = input.files[0].name
                                if (nameSong.includes('mp3')) {
                                    data[input.name] = `./assets/music/${nameSong}`
                                }
                                else {
                                    data[input.name] = `./assets/img/${nameSong}`
                                }
                                break;
                            default:
                                data[input.name] = input.value
                        }
                        return data
                    }, {})
                    options.onSubmit(formValues)
                }
                else{
                    formElement.submit()
                }
            }
            
        }
    }
}


//  Định nghĩa các rules
//  Nguyên tắc của các rules: 
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ (không có lỗi) => Không trả ra cái gì cả (undefined)
Validator.isRequired = selector => ({
    selector: selector,
    test: function (value) {
        return value ? undefined : 'Vui lòng nhập trường này!'
    }
})

Validator.isEmail = selector => ({
    selector: selector,
    test: function (value) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value) ? undefined : 'Trường này phải là email!'
    }
})

Validator.isPassWork = (selector, min) => ({
    selector: selector,
    test: function (value) {
        return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự`
    }
})


Validator.Confirmed = function (selector, getPassWork, errorMessage) {
    return {
        selector: selector,
        test: function (value) {
            return getPassWork() == value ? undefined : errorMessage || 'Trường này không hợp lệ!'
        }
    }
}   
