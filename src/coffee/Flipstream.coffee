class Flipstream

  selectedPageIndex: 0
  selectedElementIndex: 0

  constructor: ( target ) ->
    @$target = $( target )
    @$previousNav = @$target.find( '.previous-nav a' ).click @previous
    @$nextNav = @$target.find( '.next-nav a' ).click @next
    
    @$pageContainer = $( '.page-container' )
    @$pages = @$pageContainer.find( '.page' )
    
    $( '.article .flow' ).each ( i, c ) ->
      console.log @
    
    @setSelectedPageIndex 0
    @updateIndexes 0
  
  previous: =>
    return if @selectedPageIndex == 0
    
    $pagesToTurn = @getPagesToTurn()
    $pagesToTurn.removeClass 'turned'
    
    @setSelectedPageIndex @selectedPageIndex - 1
    @updateIndexes -1
    
  next: =>
    return if @selectedElementIndex == @$pages.length - 1
    
    @updateIndexes +1
    @setSelectedPageIndex @selectedPageIndex + 1
    
    $pagesToTurn = @getPagesToTurn()
    $pagesToTurn.addClass 'turned'
  
  getPagesToTurn: ->
    $page1       = @$pages[ @selectedElementIndex - 2 ]
    $page2       = @$pages[ @selectedElementIndex - 1 ]
    
    return $( [ $page1, $page2 ] )
  
  setSelectedPageIndex: ( index ) ->
    @selectedPageIndex = index
    @selectedElementIndex = index * 2
    
    @$previousNav
      .html( @selectedElementIndex )
      .toggleClass 'hidden', @selectedPageIndex is 0
      
    @$nextNav
      .html( @selectedElementIndex + 2 )
      .toggleClass 'hidden', @selectedElementIndex > @$pages.length - 1
    
    @$pageContainer.attr 'data-page', index
    @$pageContainer.attr 'data-element', index * 2
    
    @$pages.each ( i, c ) =>
      $( c ).toggleClass( 'selected', i is @selectedElementIndex or i is @selectedElementIndex - 1 )
    
    return index
  
  updateIndexes: ( delta ) ->
    @$pages.each ( i, c ) =>
      sei = @selectedElementIndex
      
      $( c )
        .toggleClass( 'underlay', i is @selectedElementIndex + 2 )
        .css 'z-index', @$pages.length - Math.abs( i - sei )
