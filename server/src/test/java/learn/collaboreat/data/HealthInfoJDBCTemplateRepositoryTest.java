package learn.collaboreat.data;

import learn.collaboreat.models.HealthInfo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class HealthInfoJDBCTemplateRepositoryTest {

    @Autowired
    HealthInfoJDBCTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<HealthInfo> healthInfos = repository.findAll();
        assertNotNull(healthInfos);
        assertTrue(healthInfos.size()>0);
    }

    @Test
    void shouldFindById() {
        HealthInfo hi = repository.findById(1);
        assertEquals("Gluten Free", hi.getHealthInfoName());
    }

    @Test
    void shouldAdd() {
        HealthInfo hi = new HealthInfo();
        hi.setHealthInfoName("Vegetarian");
        HealthInfo actual = repository.add(hi);
        assertNotNull(actual);
        assertEquals(3, actual.getHealthInfoId());
    }


}
