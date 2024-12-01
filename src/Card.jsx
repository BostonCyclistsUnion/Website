// https://github.com/mapbox/public-tools-and-demos/blob/main/projects/demo-realestate/src/Card.jsx

// Card Layout, used in both Map Popups and in the List view
import PropTypes from 'prop-types'
import numeral from 'numeral'
import classNames from 'classnames'

export const pluralize = (number, word) => {
  return `${number} ${word}${number === 1 ? '' : 's'} `
}


export const LTS_Data = ({ feature, large = false }) => {
  const {
    // sale_price,
    // number_of_bedrooms,
    // number_of_bathrooms,
    // total_livable_area,
    // location
    LTS_left,
    LTS_right,
    biking_permitted_left,
    biking_permitted_right,
    bike_lane_exist_left,
    bike_lane_exist_right
  } = feature.properties

  // const price = numeral(sale_price).format('0,0')
  // const bedrooms = pluralize(number_of_bedrooms, 'bedroom')
  // const bathrooms = pluralize(number_of_bathrooms, 'bathroom')
  // const squareFootage = numeral(total_livable_area).format('0,0')
  const LTSleft = numeral(LTS_left).format('0,0')
  const LTSright = numeral(LTS_right).format('0,0')

  const largerTextClass = large ? 'text-2xl' : 'text-xl'
  const smallerTextClass = large ? 'text-base' : 'text-sm'
  const xPaddingClass = large ? 'p-0' : 'p-3'

  return (
    <div className={classNames('py-1.5', xPaddingClass)}>
      <h5
        className={classNames(
          'mb-1.5  font-bold tracking-tight',
          largerTextClass
        )}
      >
        Left: {LTSleft} | Right: {LTSright}
      </h5>
      <p className={classNames('mb-4 font-normal', smallerTextClass)}>
        {bike_lane_exist_left} | {bike_lane_exist_right}
      </p>
    </div>
  )
}

LTS_Data.propTypes = {
  feature: PropTypes.shape({
    properties: PropTypes.shape({
      LTS_left: PropTypes.any,
      LTS_right: PropTypes.any,
      biking_permitted_left: PropTypes.any,
      biking_permitted_right: PropTypes.any,
      bike_lane_exist_left: PropTypes.any,
      bike_lane_exist_right: PropTypes.any
    })
  }),
  large: PropTypes.bool
}

const Card = ({ feature, width = 'auto', shortImage = false, onClick }) => {
  const handleClick = () => {
    onClick(feature)
  }

  // const { imageUrl } = feature.properties

  return (
    <div className='cursor-pointer' onClick={handleClick}>
      <div
        className='bg-white border border-gray-200 rounded-2xl '
        style={{
          width,
          boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* <div
          className={classNames('bg-cover  m-1.5', {
            'h-44': shortImage,
            'h-52': !shortImage
          })}
          style={{
            backgroundImage: `url("${import.meta.env.BASE_URL}/${imageUrl}")`,
            borderRadius: 11.28
          }}
        ></div> */}
        <LTS_Data feature={feature} />
      </div>
    </div>
  )
}

Card.propTypes = {
  feature: PropTypes.shape({
    properties: PropTypes.shape({
      imageUrl: PropTypes.string
    })
  }),
  onClick: PropTypes.func,
  shortImage: PropTypes.bool,
  width: PropTypes.string
}

export default Card