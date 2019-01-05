using UnityEngine;

public class PhysicsController : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if(collision.gameObject.tag == "Bullet")
        {
            collision.isTrigger = false;
            AudioController.Instance.PlayBounceSound();
        }
    }

    private void OnCollisionExit2D(Collision2D collision)
    {
        if (collision.gameObject.tag == "Bullet")
        {
            collision.collider.isTrigger = true;
        }
    }
}
