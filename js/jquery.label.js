/**
 * @author JungHyunKwon
 * @since 2017-12-06
 * @version 1.0.0
 */
(function($) {
	'use strict';

	var _defaultLabelText;

	/**
	 * @name label
	 * @param {string} method
	 * @param {string} value
	 * @return {object || string || array [object {
		   $element : object,
		   value : array [string] || string
	   }]}
	 */
	$.fn.label = function(method, value) {
		var isString = typeof value === 'string',
			hasValue = arguments.hasOwnProperty(1),
			result = [];

		this.each(function(index, element) {
			var $element = $(element),
				$labelText = $element.find('.label_text:first'),
				$labelItem = $element.find('.label_item:first');

			//파괴일 때
			if(method === 'destroy') {
				$element.removeClass('focus active');
				$element.add($labelItem).off('.label');

			//초기화일 때
			}else if($element.is(':reset')) {
				$element.on('click.label', function(event) {
					var $form = $element.parents('form');

					//요소가 있을 때
					if($form.length) {
						$form[0].reset();

						$form.find('.label').label('refresh');

						event.preventDefault();
					}
				});

			//새로고침
			}else if(method === 'refresh') {
				$labelItem.triggerHandler('change.label');

			//포커스
			}else if(method === 'focus') {
				$labelItem.focus();

			//초기화
			}else if(method === 'reset') {
				$labelItem.val(($labelItem.is('select[multiple]')) ? NaN : '');
				$element.label('refresh');

			//값
			}else if(method === 'val') {
				//값이 있을 때
				if(hasValue) {
					//문자일 때
					if(isString) {
						$labelItem.val(value);
						$element.label('refresh');
					}
				}else{
					result.push({
						$element : $element,
						value : $labelItem.val() || ''
					});
				}

			//기본
			}else if(method === 'default') {
				//값이 있을 때
				if(hasValue) {
					//문자일 때
					if(isString) {
						_defaultLabelText = value;

						$labelItem.triggerHandler('label:setDefault.label');

						$element.label('refresh');

						_defaultLabelText = undefined;
					}
				}else{
					$labelItem.triggerHandler('label:getDefault.label');

					result.push({
						$element : $element,
						value : _defaultLabelText
					});

					_defaultLabelText = undefined;
				}
			}else{
				var defaultLabelText = $labelText.text();

				$element.label('destroy');

				$labelItem.on('change.label', function(event) {
					var tagName = this.tagName,
						type = this.type,
						labelText = [],
						i = 0;

					//셀렉트일 때
					if(tagName === 'SELECT') {
						var $selectedOption = $labelItem.find('option:selected'),
							selectedOptionLength = $selectedOption.length;

						for(; i < selectedOptionLength; i++) {
							labelText[i] = $selectedOption.eq(i).text();
						}

						labelText = labelText.join(', ');

						//값이 없을 때
						if(!labelText) {
							labelText = defaultLabelText;
						}

						//선택된 옵션이 있을 때
						if(selectedOptionLength) {
							$element.addClass('active');
						}else{
							$element.removeClass('active');
						}

						$labelText.text(labelText);

					//인풋일 때
					}else if(tagName === 'INPUT') {
						//체크박스일 때
						if(type === 'checkbox') {
							//체크되어 있을 때
							if(this.checked) {
								$element.addClass('active');
							}else{
								$element.removeClass('active');
							}

						//라디오일 때
						}else if(type === 'radio') {
							var $labelRadioItem = $('.label.radio .label_item'),
								labelRadioItemLength = $labelRadioItem.length;

							for(; i < labelRadioItemLength; i++) {
								var $labelRadio = $labelRadioItem.eq(i).parents('.label.radio');

								//체크되어 있을 때
								if($labelRadioItem[i].checked) {
									$labelRadio.addClass('active');
								}else{
									$labelRadio.removeClass('active');
								}
							}

						//파일일 때
						}else if(type === 'file') {
							var files = this.files || this.value;

							//파일이 없을 때
							if(!files) {
								files = [];
							}

							//문자일 때
							if(typeof files === 'string') {
								files = [files];
							}

							var filesLength = files.length;

							for(; i < filesLength; i++) {
								var file = files[i];

								labelText[i] = file.name || file;
							}

							labelText = labelText.join(', ');

							//값이 없을 때
							if(!labelText) {
								labelText = defaultLabelText;
							}

							$labelText.text(labelText);

							//파일이 선택되어 있을 때
							if(filesLength) {
								$element.addClass('active');
							}else{
								$element.removeClass('active');
							}
						}
					}
				}).on('focusin.label', function(event) {
					$element.addClass('focus');
				}).on('focusout.label', function(event) {
					$element.removeClass('focus');
				}).on('label:getDefault.label', function(event) {
					_defaultLabelText = defaultLabelText;
				}).on('label:setDefault.label', function(event) {
					defaultLabelText = _defaultLabelText;
				});

				$element.label('refresh');
			}
		});

		var resultLength = result.length;

		//결과가 있을 때
		if(resultLength === 1) {
			result = result[0].value;

		//결과가 없을 때
		}else if(!resultLength) {
			result = this;
		}

		return result;
	};
})(jQuery);