
### Changes 

Change the component to use a semantic component compound approach.

Allow to have an API around the component structure:

* Slider - the top container and state manager
* SliderItem - "abstract" component to wrap content item
* SliderPaginator - "abstract" component to define a custom paginator to use (optional). When tot used the default paginator bullets will be used.
* SliderPaginatorItem - "abstract" component to define custom paginator bullet
* SliderButton - button 'next' on bottom

Advantages:

* abstract the component tree from html tag elements
* better control of render
* better customization of sub components like button and paginator 


### API

```javascript

<Slider
  [className:string=<'viewport-slider' className | 'viewport-slider'>]
  [style:object]
  [animateSpeed:number=<1000>]
>
  <SliderItem
    [isActive:bool=<false>]
    [className:string=<'viewport-slider-item' className | 'viewport-slider-item'>] 
    [style:object=<merge(SliderItem.defaultProps.style, style)>]
    [nextButton:object=<SliderItem.defaultProps.nextButton | 
                              (nextButton.type===SliderButton?
                                nextButton :
                                <SliderButton>nextButton</SliderButton>}>]
  >
    {children}
  </SliderItem>
  <SliderItem ... />
  ...
  ...
  <SliderPaginator
    [defaultStyle:bool=<true>]
    [className:string=<'viewport-slider-paginator' defaultStyle? '' : className>]  
    [style:object=<defaultStyle? SliderPaginator.defaultProps.style : style>]
  >
    <SliderPaginatorItem>{children}</SliderPaginatorItem>  
    <SliderPaginatorItem>{children}</SliderPaginatorItem>  
    ...
  </SliderPaginator>  
</Slider>

```
