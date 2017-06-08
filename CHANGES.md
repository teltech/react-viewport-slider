
### Changes 

Change the component to use a semantic component compound approach.

Allow to have an API around the component structure:

* Slider - the top container and state manager
* SliderItem - "abstract" component to wrap content slider item
* SliderPaginator - "abstract" component to define a custom paginator to use (optional). If not used the default paginator bullets will be used.
* SliderPaginatorItem - "abstract" component to define custom paginator item bullet
* SliderButton - button 'next' on bottom

So..., this:

```html

<Slider>
  <SliderPaginator>
    <SliderPaginatorItem>...</SliderPaginatorItem>
  </SliderPaginator>
  <SliderItem>...</SliderItem>  
  <SliderItem nextButton={<SliderButton>...</SliderButton>}>...</SliderItem>
</Slider>

```

Will render to this:

```html

<!-- Slider render: -->
<div class="viewport-slider ..." ...>
  <!-- SliderPaginator render: -->
  <div class="viewport-slider-paginator ..." ...>
    <!-- SliderPaginatorItem render: -->
    <a class="viewport-slider-paginator-bullet" ...>...</a>
  </div>
  <!-- SliderItem render: -->
  <div class="viewport-slider-item ..." ...>
    ...
    <!-- SliderButon render: -->
    <a class="viewport-slider-button ..." ...>...</a>
  </div>
</div>

```

#### Advantages:

* abstract the component tree from html tag elements
* better control of render and composition
  - can even mix other elements between the items's: they will be render as expected
* better customization of sub components like button and paginator 

### API

```javascript

<Slider
  [className:string=<'viewport-slider' + className | 'viewport-slider'>]
  [style:object]
  [animateSpeed:number=<1000>]
>
  <SliderItem
    [isActive:bool=<false>]
    [className:string=<'viewport-slider-item' + className | 'viewport-slider-item'>] 
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
    [className:string=<'viewport-slider-paginator' + className>]  
    [style:object=<merge(SliderPaginator.defaultProps.style, style)>]
    [items:[node]]
  >
    <SliderPaginatorItem>{children}</SliderPaginatorItem>  
    <SliderPaginatorItem>{children}</SliderPaginatorItem>  
    ...
  </SliderPaginator>  
</Slider>

```

#### Notes

- SliderPaginator:

  - If not specified the default paginator layout will be used (bullets on right/center); which is the same to use <SliderPaginator />
  
  - prop 'items': inline array with nodes to use for each paginator bullet item; Takes precendence over the 'SliderPaginatorItem' passed in as children.

  - If number of bullets (passed as 'items' or as 'SliderPaginatorItem') does not match number of items (SliderItem's) the default layout for the bullets will be applied; (**Note:**the className and style props on SlidePaginator will still be used)
