import React from 'react'
const SearchForm2 = () => {
    return (
      <div className='lg:grid grid-cols-3 gap-4 mb-4'>
          <div className={`form-element form-element-inline mb-4 lg:mb-0`}>
              <div className="form-label">TYPE</div>
              <select className="form-select">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                  <option>Option 4</option>
              </select>
          </div>
          <div className={`form-element form-element-inline mb-4 lg:mb-0`}>
              <div className="form-label">ShipName</div>
              <input
                name="name"
                type="text"
                className="form-input w-full"
                placeholder="Enter something..."
              />
          </div>
          <div className={`form-element form-element-inline mb-4 lg:mb-0`}>
              <div className="form-label">DWT</div>
              <select className="form-select">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                  <option>Option 4</option>
              </select>
          </div>
          <div className={`form-element form-element-inline mb-4 lg:mb-0`}>
              <div className="form-label">Year</div>
              <input
                name="name"
                type="text"
                className="form-input w-full"
                placeholder="Enter something..."
              />
              <b>~</b>
              <input
                name="name"
                type="text"
                className="form-input w-full"
                placeholder="Enter something..."
              />
          </div>
          <div className={`form-element form-element-inline mb-4 lg:mb-0`}>
              <div className="form-label">Flag</div>
              <input
                name="name"
                type="text"
                className="form-input w-full"
                placeholder="Enter something..."
              />
          </div>
          <div className={`form-element form-element-inline mb-4 lg:mb-0`}>
              <div className="form-label">ShipYard</div>
              <input
                name="name"
                type="text"
                className="form-input w-full"
                placeholder="Enter something..."
              />
          </div>
          <div className={`form-element form-element-inline mb-4 lg:mb-0`}>
              <div className="form-label">TEU</div>
              <input
                name="name"
                type="text"
                className="form-input w-full"
                placeholder="Enter something..."
              />
              <b>~</b>
              <input
                name="name"
                type="text"
                className="form-input w-full"
                placeholder="Enter something..."
              />
          </div>
          <div className={`form-element form-element-inline mb-4 lg:mb-0`}>
              <div className="form-label">Price</div>
              <input
                name="name"
                type="text"
                className="form-input w-full"
                placeholder="Enter something..."
              />
              <b>~</b>
              <input
                name="name"
                type="text"
                className="form-input w-full"
                placeholder="Enter something..."
              />
          </div>
      </div>
    )
}

export default SearchForm2
