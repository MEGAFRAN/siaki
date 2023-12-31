import styles from "../../../app/styles/layouts/company.module.scss"
import PageHead from "../../../app/components/page_head/PageHead"
import { getStaticPathsItem, getStaticPropsItem } from "../../../lib/companies"
import { Company, Schedule } from "../../../app/constants/interfaces/content_models/interfaces"
import Breadcrumb from "../../../app/components/breadcrumb/Breadcrumb"
import calculationsUtils from "../../../lib/calculations"
import Review from "../../../app/components/review/Review"
import RatingStars from "../../../app/components/rating_stars/RatingStars"

export { getStaticPropsItem as getStaticProps, getStaticPathsItem as getStaticPaths }
const CompanyPage = ({ data }: { data: { company: Company } }) => {
  const {
    isPaidUser,
    reviews,
    _id,
    title,
    slug,
    description,
    category,
    contact,
    services,
    socialMedia,
    schedule,
    specialities,
  } = data.company || {}
  const { phone, whatsapp, website, email } = contact || {}
  const hasReviews = reviews?.length
  const reviewsAverage = hasReviews ? calculationsUtils.getAverageOfReviews(reviews) : 0
  const formatSchedule = (scheduleData: Schedule): Schedule => {
    if (!scheduleData) throw new Error("Invalid schedule data provided, check Schedule interface")

    const daysOrder = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]

    const formattedSchedule = daysOrder.reduce((acc, day) => {
      acc[day] = scheduleData[day]
      return acc
    }, {} as Schedule)

    return formattedSchedule
  }

  const formattedSchedule = formatSchedule(schedule)
  return (
    <>
      <PageHead
        description={description}
        title={title}
        locale={"es"}
        url={`https://www.siaki.co/${slug}`}
      />
      <main className={styles.container}>
        <header>
          <Breadcrumb />
          <section className={styles.summary}>
            <h1>{title}</h1>
            {specialities && (
              <ul className={styles.specialities}>
                {specialities.map((speciality, index) => (
                  <li key={index}>{speciality}</li>
                ))}
              </ul>
            )}
            {isPaidUser && hasReviews && (
              <div className={styles.reviews}>
                <RatingStars rating={reviewsAverage} />
                <span>{hasReviews} opiniones</span>
              </div>
            )}
            {description && <p className={styles.description}>{description}</p>}
          </section>
          {services && (
            <section>
              <h2>Servicios</h2>
              <ul className={styles.services}>
                {services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </section>
          )}
          {contact && (
            <section className={styles.contact}>
              <h2>Contacto</h2>
              <address>
                <dl>
                  {phone && (
                    <>
                      <dt>Phone Number</dt>
                      <dd>
                        <a href={`tel:${phone}`}>{phone}</a>
                      </dd>
                    </>
                  )}

                  {whatsapp && (
                    <>
                      <dt>WhatsApp</dt>
                      <dd>
                        <a
                          href={`https://wa.me/${whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {whatsapp}
                        </a>
                      </dd>
                    </>
                  )}

                  {website && (
                    <>
                      <dt>Website</dt>
                      <dd>
                        <a href={website} target="_blank" rel="noopener noreferrer">
                          {website}
                        </a>
                      </dd>
                    </>
                  )}

                  {email && (
                    <>
                      <dt>Email</dt>
                      <dd>
                        <a href={`mailto:${email}`}>{email}</a>
                      </dd>
                    </>
                  )}
                </dl>
              </address>
            </section>
          )}
          {isPaidUser && hasReviews && <Review reviews={reviews} />}
          {isPaidUser && schedule && (
            <section className={styles.schedule}>
              <h2>Horario</h2>
              <dl>
                {Object.entries(formattedSchedule).map(([day, time]) => (
                  <>
                    <dt>{day}</dt>
                    <dd>{time}</dd>
                  </>
                ))}
              </dl>
            </section>
          )}
          {isPaidUser && socialMedia && (
            <section className={styles.social_media}>
              <h2>Redes sociales</h2>
              <nav>
                <dl>
                  {Object.entries(socialMedia).map(([key, value]) => (
                    <>
                      <dt>{key}</dt>
                      <dd>
                        <a href={value?.toString()}>{value}</a>
                      </dd>
                    </>
                  ))}
                </dl>
              </nav>
            </section>
          )}
        </header>
      </main>
    </>
  )
}

export default CompanyPage
